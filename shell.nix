{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  nativeBuildInputs = with pkgs;
    [ nodejs-16_x libiconv ] ++ (
      # workaround for compile failed with
      # ld: framework not found Security
      # source:
      # https://discourse.nixos.org/t/compile-a-rust-binary-on-macos-dbcrossbar/8612
      if pkgs.stdenv.isDarwin then
        [ darwin.apple_sdk.frameworks.Security ]
      else
        [ ]);
}
