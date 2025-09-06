#!/usr/bin/env python3
import argparse, math
from pathlib import Path
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def bar_sorted(outdir, means, sds, ylabel, title, fname):
    order = means.sort_values(ascending=False).index
    m = means.loc[order]; s = sds.loc[order]
    plt.figure(figsize=(12,7))
    plt.bar(range(len(m)), m.values, yerr=s.values, capsize=4)
    plt.xticks(range(len(m)), order, rotation=35, ha='right')
    plt.ylabel(ylabel); plt.title(title)
    plt.tight_layout(); plt.savefig(outdir/fname, dpi=160); plt.close()

def improvement_vs_baseline(df, series_name, baseline_label, title, ylabel, fname, outdir):
    ser = df[series_name]
    means = ser.groupby(df['variant']).mean()
    if baseline_label not in means or np.isclose(means[baseline_label], 0.0):
        print(f"[warn] baseline '{baseline_label}' not found or zero for {series_name}; skipping {fname}")
        return
    base = means[baseline_label]
    imp = (1.0 - means / base) * 100.0  # +% means lower (better) than baseline
    order = imp.sort_values(ascending=False).index
    vals = imp.loc[order]

    # plot
    plt.figure(figsize=(12,7))
    colors = ['C2' if v>=0 else 'C3' for v in vals]  # green if improved (lower)
    plt.bar(range(len(vals)), vals.values, color=colors)
    plt.axhline(0, lw=1, color='k')
    plt.xticks(range(len(vals)), order, rotation=35, ha='right')
    plt.ylabel(ylabel); plt.title(title)
    for i,v in enumerate(vals.values):
        plt.text(i, v + (2 if v>=0 else -3), f"{v:.1f}%", ha='center',
                 va=('bottom' if v>=0 else 'top'))
    plt.tight_layout(); plt.savefig(outdir/fname, dpi=160); plt.close()

    # table
    out_tbl = outdir / f"improvement_{series_name}_vs_{baseline_label}.csv"
    vals.to_csv(out_tbl, header=['improvement_percent'])
    print("[ok] wrote", out_tbl)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="in_csv", default="analysis/compare_results.csv")
    ap.add_argument("--baseline", required=True, help="label to use as baseline (e.g. 'baseline')")
    ap.add_argument("--outdir", default="analysis")
    args = ap.parse_args()

    outdir = Path(args.outdir); outdir.mkdir(parents=True, exist_ok=True)
    df = pd.read_csv(args.in_csv)

    # recompute profiler total defensively (pkg + igpu + dram)
    cols = {'prof_pkg_mWh','prof_igpu_mWh','prof_dram_mWh'}
    if cols.issubset(df.columns):
        df['prof_total_mWh'] = df['prof_pkg_mWh'].astype(float) + \
                               df['prof_igpu_mWh'].astype(float) + \
                               df['prof_dram_mWh'].astype(float)

    # ===== Profiler (tab energy) =====
    g = df.groupby('variant')['prof_total_mWh']
    prof_means = g.mean(); prof_sds = g.std(ddof=1).fillna(0.0)
    # summary table
    prof_summary = pd.DataFrame({"mean_prof_total_mWh": prof_means,
                                 "sd_prof_total_mWh": prof_sds})
    prof_summary.to_csv(outdir/"summary_profiler_by_variant.csv")
    print("[ok] wrote", outdir/"summary_profiler_by_variant.csv")

    bar_sorted(outdir, prof_means, prof_sds,
               ylabel='Tab energy (mWh) — Firefox (CPU pkg + iGPU)',
               title='Profiler Energy by Variant (mean ± SD, sorted)',
               fname='plot_profiler_energy_sorted.png')

    improvement_vs_baseline(df, 'prof_total_mWh', args.baseline,
               title='Profiler energy improvement vs baseline',
               ylabel='Improvement (% lower is better)',
               fname='plot_profiler_improvement_vs_baseline.png',
               outdir=outdir)

    # Optional breakdown (stacked) for means of pkg vs igpu
    if {'prof_pkg_mWh','prof_igpu_mWh'}.issubset(df.columns):
        pkg_mean = df.groupby('variant')['prof_pkg_mWh'].mean()
        igpu_mean = df.groupby('variant')['prof_igpu_mWh'].mean()
        order = (pkg_mean+igpu_mean).sort_values(ascending=False).index
        plt.figure(figsize=(12,7))
        plt.bar(order, pkg_mean.loc[order].values, label='CPU package')
        plt.bar(order, igpu_mean.loc[order].values, bottom=pkg_mean.loc[order].values, label='iGPU')
        plt.ylabel('Tab energy (mWh)')
        plt.title('Profiler Breakdown (means): CPU package + iGPU')
        plt.legend()
        plt.tight_layout(); plt.savefig(outdir/"plot_profiler_breakdown_sorted.png", dpi=160); plt.close()

    # ===== Plug (wall net energy) =====
    if 'plug_net_mWh' in df.columns:
        g2 = df.groupby('variant')['plug_net_mWh']
        wall_means = g2.mean(); wall_sds = g2.std(ddof=1).fillna(0.0)
        wall_summary = pd.DataFrame({"mean_plug_net_mWh": wall_means,
                                     "sd_plug_net_mWh": wall_sds})
        wall_summary.to_csv(outdir/"summary_plug_net_by_variant.csv")
        print("[ok] wrote", outdir/"summary_plug_net_by_variant.csv")

        bar_sorted(outdir, wall_means, wall_sds,
                   ylabel='Wall net energy (mWh) — plug minus idle',
                   title='Wall Net Energy by Variant (mean ± SD, sorted)',
                   fname='plot_plug_net_energy_sorted.png')

        improvement_vs_baseline(df, 'plug_net_mWh', args.baseline,
                   title='Wall net energy improvement vs baseline',
                   ylabel='Improvement (% lower is better)',
                   fname='plot_plug_net_improvement_vs_baseline.png',
                   outdir=outdir)

    # Scatter per-run (sanity): profiler vs plug net
    if {'prof_total_mWh','plug_net_mWh'}.issubset(df.columns):
        plt.figure(figsize=(7,7))
        plt.scatter(df['prof_total_mWh'], df['plug_net_mWh'])
        plt.xlabel('Profiler tab energy (mWh)')
        plt.ylabel('Wall net energy (mWh)')
        plt.title('Profiler vs Plug (per run)')
        plt.tight_layout(); plt.savefig(outdir/"plot_profiler_vs_plug_scatter.png", dpi=160); plt.close()

    print("[ok] charts written to", outdir)

if __name__ == "__main__":
    main()
