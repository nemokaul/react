<#
.SYNOPSIS
    Build and minify script for LinkedIn Learning Java site.
.DESCRIPTION
    Runs Zola build with --minify, then deeply minifies CSS, JS, JSON, SVG, XML with minify.exe.
.EXAMPLE
    .\build.ps1
#>

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
cmake -P "$scriptDir/build.cmake"
if ($LASTEXITCODE -ne $null -and $LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}
exit 0


