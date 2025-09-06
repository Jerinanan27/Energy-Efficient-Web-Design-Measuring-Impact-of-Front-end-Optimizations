# tuya_logger_cloud_manual.py
import argparse, csv, time, datetime, os, json
from pathlib import Path
from dotenv import load_dotenv
from tuya_iot import TuyaOpenAPI
from types import SimpleNamespace

load_dotenv()

def now_iso():
    return datetime.datetime.now().isoformat(timespec="milliseconds")

def parse_power(result):
    """result is a list of {'code','value'} from /status"""
    d = {x.get('code'): x.get('value') for x in (result or [])}
    # cur_power (often deciwatts)
    if d.get('cur_power') is not None:
        try:
            v = float(d['cur_power'])
            return v/10.0
        except: pass
    # plain 'power' (sometimes already watts)
    if d.get('power') is not None:
        try:
            v = float(d['power'])
            return v/10.0 if v > 1000 else v
        except: pass
    # electricity_data JSON string with "power"
    if d.get('electricity_data'):
        try:
            ed = d['electricity_data']
            if isinstance(ed, str):
                ed = json.loads(ed)
            v = float(ed.get('power', float('nan')))
            return v/10.0 if v > 1000 else v
        except: pass
    # compute from current/voltage (mA * dV)
    if d.get('cur_current') is not None and d.get('cur_voltage') is not None:
        try:
            I = float(d['cur_current'])/1000.0  # mA -> A
            V = float(d['cur_voltage'])/10.0    # dV -> V
            return I * V
        except: pass
    return float('nan')

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    ap.add_argument("--seconds", type=int, default=420)
    ap.add_argument("--period", type=float, default=1.0)
    ap.add_argument("--debug", action="store_true")
    args = ap.parse_args()

    Path(os.path.dirname(args.out)).mkdir(parents=True, exist_ok=True)

    ENDPOINT = os.getenv("TUYA_ENDPOINT", "https://openapi.tuyaeu.com")
    AID = os.getenv("TUYA_ACCESS_ID")
    ASEC = os.getenv("TUYA_ACCESS_SECRET")
    DID = os.getenv("TUYA_DEVICE_ID")
    if not (AID and ASEC and DID):
        raise SystemExit("Missing TUYA_* in .env")

    api = TuyaOpenAPI(ENDPOINT, AID, ASEC)

        # --- manual token fetch (workaround for connect() not setting token_info) ---
    tok = api.get("/v1.0/token?grant_type=1")
    if not tok.get("success"):
        print("Token error:", tok); raise SystemExit(2)

    # Convert dict to an object with attributes the SDK expects
    api.token_info = SimpleNamespace(
        access_token = tok["result"]["access_token"],
        refresh_token = tok["result"].get("refresh_token", ""),
        expire_time  = tok["result"].get("expire_time", 0),
        uid          = tok["result"].get("uid", "")
    )
# ---------------------------------------------------------------------------

    # ---------------------------------------------------------------------------

    if args.debug:
        print(json.dumps(api.get(f"/v1.0/devices/{DID}/status"), indent=2))
        return

    t_end = time.time() + args.seconds
    with open(args.out, "w", newline="") as f:
        w = csv.writer(f); w.writerow(["timestamp_iso","power_W"])
        while time.time() < t_end:
            try:
                st = api.get(f"/v1.0/devices/{DID}/status")
                if not st.get("success"):
                    print("status error:", st.get("code"), st.get("msg"))
                    w.writerow([now_iso(), float('nan')])
                else:
                    w.writerow([now_iso(), parse_power(st.get("result"))])
                f.flush()
            except Exception as e:
                print("read error:", e)
                w.writerow([now_iso(), float('nan')])
            time.sleep(args.period)

if __name__ == "__main__":
    main()
