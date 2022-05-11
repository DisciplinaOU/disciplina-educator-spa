{ aaaUrl ? null
, educatorUrl ? null
, contractAddr ? "0x0972Aba5efAC051643dB1A2936739DD27847C225"
, appStatus ? "READY"
, buildYarnPackage
, sassBinaryPath
, parallel
, brotli
, python
, fetchurl
}:

buildYarnPackage {
  REACT_APP_AAA = aaaUrl;
  REACT_APP_EDUCATOR = educatorUrl;
  REACT_APP_CONTRACT_X_ADDRESS = contractAddr;
  REACT_APP_STATUS = appStatus;
  SASS_BINARY_PATH = sassBinaryPath;

  src = ./.;

  buildInputs = [ parallel brotli python ];

  postBuild = ''
    find build/ -type f \
      -not -name '*.jpg' \
      -not -name '*.png' \
      -not -name '*.webp' \
      -not -name '*.woff' \
      -not -name '*.woff2' | parallel brotli
  '';

  yarnBuildMore = "yarn build";
  installPhase = "mv build $out";
}
