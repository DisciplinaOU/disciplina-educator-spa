{ aaaUrl ? null
, educatorUrl ? null
, buildYarnPackage
, parallel
, brotli
, constGitIgnore
}:

buildYarnPackage {
  REACT_APP_AAA = aaaUrl;
  REACT_APP_EDUCATOR = educatorUrl;
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
