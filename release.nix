{ aaaUrl ? null
, educatorUrl ? null
, buildYarnPackage
, parallel
, brotli
, constGitIgnore
, fetchurl
}:

buildYarnPackage {
  REACT_APP_AAA = aaaUrl;
  REACT_APP_EDUCATOR = educatorUrl;
  SASS_BINARY_PATH = fetchurl {
    url = https://github.com/sass/node-sass/releases/download/v4.11.0/linux-x64-64_binding.node;
    sha256 = "cef583e91b02a585458d28c12429e442026c4083ef31900024445912080d8936";
  };

  src = constGitIgnore "educator-spa" ./. [];

  buildInputs = [ parallel brotli ];

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
