generateBackgroundsWithChroma(essence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let isDark = this.skin[_vb.isDark];
    const keys = [
      _vb.nameBgHov,
      _vb.nameBg2,
      _vb.nameBg2Hov,
      _vb.nameBg3,
      _vb.nameBg3Hov,
    ];

    let colorStops = 6;

    let firstColor = this.skin[_vb.nameBg];
    let lastColor = getLastColorSingle(firstColor, isDark);

    function getSingleColorScale(fc, lc, st) {
      let _fc = fc;
      let _lc = lc;
      let _numStops = st;
      let colorScale = chroma.scale([_fc, _lc]).mode("lch").colors(_numStops);

      return colorScale;
    }

    function getLastColorSingle(fc, idDark) {
      let firstColor = fc;
      let _isDark = idDark;
      let h = chroma(firstColor).get("lch.h");
      let c = chroma(firstColor).get("lch.c");
      let l = chroma(firstColor).get("lch.l");

      // Adjust lightness and chroma based on the theme
      let adjustedL = _isDark
        ? Math.max(10, l - 20 - c / 5) // Dark palette
        : Math.min(90, l + 20 + c / 5); // Light palette

      let adjustedC = _isDark
        ? Math.max(c * 0.7, 10) // Reduce chroma for dark palette
        : Math.max(c * 0.8, 10); // Slightly reduce chroma for light palette

      console.log(h, _essence, adjustedL, adjustedC);

      // Generate the new color
      let color = chroma.lch(adjustedL, adjustedC, h).hex();

      return color;
    }

    // let palette = getSingleColorScale(firstColor, lastColor, colorStops);

    function generateSteps(fc, isDark, steps = colorStops) {
      let h = chroma(fc).get("lch.h"); // Hue
      let c = chroma(fc).get("lch.c"); // Chroma (saturation)
      let l = chroma(fc).get("lch.l"); // Lightness (brightness)

      // Adjust step values for lightness and chroma
      const lightnessAdjust = isDark ? -20 : 20;
      const chromaMultiplier = isDark ? 1.2 : 0.8;
      const hueTargets = isDark
        ? ["red", "green", "blue"]
        : ["cyan", "magenta", "yellow"];

      // Adjust hue toward nearest target
      h = shiftHueToNearest(h, hueTargets);

      // Generate 5-step palette
      const stepPalette = Array.from({ length: steps }, (_, i) => {
        // Linearly interpolate lightness
        const lStep = l + (i * lightnessAdjust) / (steps - 1);
        // Adjust chroma for each step
        const cStep = c * Math.pow(chromaMultiplier, i);

        // Clamp lightness and chroma to valid ranges
        const adjustedL = Math.min(90, Math.max(10, lStep));
        const adjustedC = Math.min(100, Math.max(0, cStep));

        return chroma.lch(adjustedL, adjustedC, h).hex();
      });

      return stepPalette;
    }

    function shiftHueToNearest(hue, targets) {
      const targetHues = {
        red: 0,
        green: 120,
        blue: 240,
        cyan: 180,
        magenta: 300,
        yellow: 60,
      };

      // Find the nearest target hue
      const nearestTarget = targets.reduce((nearest, current) => {
        const currentDistance = Math.abs(hue - targetHues[current]) % 360;
        const nearestDistance = Math.abs(hue - targetHues[nearest]) % 360;
        return currentDistance < nearestDistance ? current : nearest;
      });

      return targetHues[nearestTarget];
    }

    const palette = generateSteps(firstColor, isDark);

    this.skin[_vb.nameBgHov] = palette[1];
    this.skin[_vb.nameBg2] = palette[2];
    this.skin[_vb.nameBg2Hov] = palette[3];
    this.skin[_vb.nameBg3] = palette[4];
    this.skin[_vb.nameBg3Hov] = palette[5];

    this.skin[_vb.nameRGBA] = palette[1];
    this.skin[_vb.nameRGBA2] = palette[2];
    this.skin[_vb.nameRGBA3] = palette[3];

    // keys.forEach((key, index) => {
    //   this.skin[key] = res[index];
    // });

    // this.skin[_vb.nameRGBA] = tinycolor(this.skin[_vb.nameBg])
    //   .setAlpha(this.defaults.alpha.bg)
    //   .toRgbString();
    // this.skin[_vb.nameRGBA2] = tinycolor(this.skin[_vb.nameBg])
    //   .setAlpha(this.defaults.alpha.bg2)
    //   .toRgbString();
    // this.skin[_vb.nameRGBA3] = tinycolor(this.skin[_vb.nameBg])
    //   .setAlpha(this.defaults.alpha.bg3)
    //   .toRgbString();

    if (this.variant === "casino") {
      // let mixTint = _isDark ? "#fff" : "#000";
      let mixTint = "#000";
      this.skin[`${_vb.name}Shadow`] = tinycolor
        .mix(mixTint, this.skin[_vb.nameBg], 80)
        .setAlpha(80)
        .toRgbString();
      this.skin[`${_vb.name}ShadowFade`] = tinycolor
        .mix(mixTint, this.skin[_vb.nameBg], 80)
        .setAlpha(0)
        .toRgbString();
    }
  }