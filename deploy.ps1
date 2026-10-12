<#
.SYNOPSIS
    Automated deployment script using CMake for the LinkedIn Learning React site.
.DESCRIPTION
    Commits current changes in zola-reactjs, runs zola build --minify,
    syncs public/ to the react-gh-pages repo on the gh-pages branch, commits with the same message,
    and pushes to origin gh-pages.
.PARAMETER Message
    Commit message for repositories. If omitted, uses a timestamped default.
.PARAMETER PushSource
    Switch to also push the source repository (zola-reactjs) to origin.
.EXAMPLE
    .\deploy.ps1 "feat: add chapter summary notes and ask-ai assistant"
.EXAMPLE
    .\deploy.ps1 -PushSource
#>
param(
  [Parameter(Position = 0)]
  [string]$Message,

  [switch]$PushSource
)

$argsList = @("-P", "deploy.cmake")

if ($Message) {
  $argsList = @("-DMSG=$Message") + $argsList
}

if ($PushSource) {
  $argsList = @("-DPUSH_SOURCE=ON") + $argsList
}

Write-Host "Running: cmake $argsList" -ForegroundColor Cyan
cmake @argsList
if ($LASTEXITCODE -ne $null -and $LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}
exit 0

