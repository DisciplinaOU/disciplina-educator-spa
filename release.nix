{ aaaUrl ? null
, educatorUrl ? null
, buildYarnPackage
, parallel
, brotli
, python
, constGitIgnore
, fetchurl
}:

buildYarnPackage {
  REACT_APP_AAA = aaaUrl;
  REACT_APP_EDUCATOR = educatorUrl;
  SASS_BINARY_PATH = fetchurl {
    url = https://github.com/sass/node-sass/releases/download/v7.0.1/linux-x64-93_binding.node;
    sha256 = "1rzrzyy5sla708qypr7s3kqwc3g0dhc99bjvxwf3qq4dfygags7x";
  };

  src = constGitIgnore "educator-spa" ./. [];

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
