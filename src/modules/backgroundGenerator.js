export default generateBackgroundsWithChroma = (
  chroma,
  essence,
  skin,
  verbalData
) => {
  let _essence = essence;
  let _skin = skin;
  let _vb = verbalData(_essence);
  let isDark = _skin[_vb.isDark];
  const bgKeyNames = [
    _vb.nameBgHov,
    _vb.nameBg2,
    _vb.nameBg2Hov,
    _vb.nameBg3,
    _vb.nameBg3Hov,
  ];

  const bgAKeyNames = [_vb.nameRGBA, _vb.nameRGBA2, _vb.nameRGBA3];

  let colorStops = 6;

  let firstColor = _skin[_vb.nameBg];

  bgKeyNames.forEach((bgName, i) => {
    _skin[bgName] = isDark
      ? chroma(firstColor).darken(i + 1)
      : chroma(firstColor).brighten(i + 1);
  });

  bgAKeyNames.forEach((bgName, i) => {
    _skin[bgName] = chroma(firstColor)
      .alpha(i * 0.5)
      .css();
  });
};
