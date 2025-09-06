# plug_energy_window.py
# Compute energy from Tuya plug CSV over a time window; optionally subtract idle baseline.
# Usage examples:
#   python plug_energy_window.py --csv "logs/plug/baseline__run__20250816-0715.csv" --start "2025-08-16 07:16:00" --seconds 180.839
#   python plug_energy_window.py --csv "logs/plug/baseline__run__20250816-0715.csv" --start "2025-08-16 07:16:00" --seconds 180.839 --idle-w 70
#
import argparse, csv, math
from pathlib import Path
from datetime import datetime, timedelta, timezone

def parse_ts(s: str) -> datetime:
    # Accept ISO with or without timezone (assume local if none)
    try:
        return datetime.fromisoformat(s.replace("Z","+00:00"))
    except Exception:
        # Fallback: try without subsecond
        return datetime.strptime(s, "%Y-%m-%d %H:%M:%S")

def read_series(csv_path):
    rows = []
    with open(csv_path, newline="", encoding="utf-8") as f:
        r = csv.DictReader(f)
        for row in r:
            try:
                t = parse_ts(row["timestamp_iso"])
                p = float(row["power_W"])
                if math.isnan(p): continue
                rows.append((t, p))
            except Exception:
                continue
    rows.sort(key=lambda x: x[0])
    return rows

def slice_window(series, t0: datetime, t1: datetime):
    return [(t,p) for (t,p) in series if t0 <= t <= t1]

def integrate_wh(window):
    if len(window) < 2: return 0.0, 0.0
    energy_Wh = 0.0
    w_sum = 0.0
    for i in range(1, len(window)):
        t0, p0 = window[i-1]
        t1, p1 = window[i]
        dt_s = (t1 - t0).total_seconds()
        if dt_s <= 0: continue
        # trapezoid over W vs s -> Ws; convert to Wh
        energy_Wh += (p0 + p1) * 0.5 * dt_s / 3600.0
        w_sum += p1
    duration_s = (window[-1][0] - window[0][0]).total_seconds()
    avg_W = (energy_Wh * 3600.0 / duration_s) if duration_s > 0 else float("nan")
    return energy_Wh, avg_W

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", required=True, help="Tuya CSV path (timestamp_iso,power_W)")
    ap.add_argument("--start", required=True, help='Start time, e.g. "2025-08-16 07:16:00"')
    ap.add_argument("--end", help='End time; OR use --seconds')
    ap.add_argument("--seconds", type=float, help="Duration in seconds if --end not given")
    ap.add_argument("--idle-w", type=float, default=None, help="Idle baseline W to subtract (optional)")
    args = ap.parse_args()

    series = read_series(args.csv)
    if not series:
        raise SystemExit("No valid data rows found in CSV")

    t0 = parse_ts(args.start)
    if args.end:
        t1 = parse_ts(args.end)
    else:
        if not args.seconds:
            raise SystemExit("Provide --end or --seconds")
        t1 = t0 + timedelta(seconds=args.seconds)

    window = slice_window(series, t0, t1)
    if len(window) < 2:
        raise SystemExit("Selected window has too few samples. Check --start/--end.")

    energy_Wh, avg_W = integrate_wh(window)
    energy_mWh = energy_Wh * 1000.0

    print(f"Window: {window[0][0].isoformat()}  ->  {window[-1][0].isoformat()}")
    print(f"Duration: {(window[-1][0]-window[0][0]).total_seconds():.3f} s")
    print(f"Plug energy (total): {energy_mWh:.2f} mWh  (avg {avg_W:.2f} W)")

    if args.idle_w is not None:
        # Net energy above idle (clip negatives to 0)
        net_Wh = 0.0
        for i in range(1, len(window)):
            t0, p0 = window[i-1]; t1, p1 = window[i]
            dt_s = (t1 - t0).total_seconds()
            p0n = max(0.0, p0 - args.idle_w)
            p1n = max(0.0, p1 - args.idle_w)
            net_Wh += (p0n + p1n) * 0.5 * dt_s / 3600.0
        print(f"Plug energy (above idle {args.idle_w} W): {net_Wh*1000.0:.2f} mWh")

if __name__ == "__main__":
    main()
