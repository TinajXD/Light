{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
    packages = with pkgs; [
      nodejs
    ];

    shellHook = ''
      npm install npm@latest
      node version
      npm install
    '';
  
}