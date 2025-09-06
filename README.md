# Energy-Efficient Web Design — Experiment Toolkit

This repository contains the codes and dataset used to evaluate how front-end optimizations (image compression, lazy loading, code minification) affect client-side energy use and CO₂ emissions.

## Contents

* `browse_variant.py` — automated browsing with Selenium
* `tuya_logger_cloud_manual.py` — Tuya smart plug logger (CSV export)
* `plug_energy_window.py` — compute plug energy/net consumption
* `analyze_results.py` — process results, compute improvements, generate plots
* `result_analysis.py` — notebook-style version of the analysis
* `logs/` — profiler and plug logs (user-generated)
* `analysis/` — outputs (tables and plots)

## Requirements

* Python 3.9+
* Firefox Developer Edition + geckodriver
* Python packages: selenium, pandas, matplotlib, numpy, python-dotenv, tuya-iot-python-sdk

## Usage

1. Serve website variants locally (baseline, ic, cm, ll, combinations).

2. Log plug power:

   ```
   python tuya_logger_cloud_manual.py --out logs/plug/run.csv --seconds 420
   ```

3. Run automated browsing:

   ```
   python browse_variant.py --base-url http://127.0.0.1/... --duration 180
   ```

4. Integrate plug energy:

   ```
   python plug_energy_window.py --csv logs/plug/run.csv --start "..." --seconds 180 --idle-w 70
   ```

5. Aggregate results in `analysis/compare_results.csv`.

6. Analyze and plot:

   ```
   python analyze_results.py --baseline baseline --outdir analysis
   ```

## Key Formulas

* CO₂ from energy (mg):

  CO₂₍plug₎ = ( P₍plug (mWh)₎ × 442 ) / 1000

* Improvement (%):

  Improvement = (1 − (variant\_mean / baseline\_mean)) × 100

