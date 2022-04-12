{ aaaUrl ? null
, educatorUrl ? null
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
