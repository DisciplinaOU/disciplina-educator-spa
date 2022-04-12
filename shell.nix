{ pkgs ? import ./pkgs.nix }:

with pkgs;

mkShell {
  nativeBuildInputs = [
    nodejs
    yarn
    flow
  ];

  shellHook = ''
    export SASS_BINARY_PATH=${sassBinaryPath}
  '';
}
