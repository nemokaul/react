# ==============================================================================
# Standalone Static Build Script: Zola + Minify.exe
# ==============================================================================
# Usage:
#   cmake -P build.cmake
# ==============================================================================

cmake_minimum_required(VERSION 3.20)

set(SOURCE_DIR "${CMAKE_CURRENT_LIST_DIR}")
set(PUBLIC_DIR "${SOURCE_DIR}/public")
set(MINIFY_EXE "${SOURCE_DIR}/minify.exe")

message(STATUS "")
message(STATUS "=================================================================")
message(STATUS "  React & Modern Web Mastery Site - Static Site Build & Minify")
message(STATUS "=================================================================")
message(STATUS " Source: ${SOURCE_DIR}")
message(STATUS " Public: ${PUBLIC_DIR}")
message(STATUS "=================================================================")
message(STATUS "")

# Step 1: Run Zola Build with --minify
message(STATUS "🔨 [1/2] Building static site: zola build --minify...")
execute_process(
  COMMAND zola build --minify
  WORKING_DIRECTORY "${SOURCE_DIR}"
  RESULT_VARIABLE ZOLA_RES
)
if(NOT ZOLA_RES EQUAL 0)
  message(FATAL_ERROR "zola build --minify failed with exit code: ${ZOLA_RES}")
endif()
message(STATUS "   ✓ Zola build completed successfully.")

# Step 2: Minify All Assets with minify.exe
if(NOT EXISTS "${MINIFY_EXE}")
  find_program(MINIFY_EXE NAMES minify minify.exe)
endif()

if(EXISTS "${MINIFY_EXE}")
  message(STATUS "⚡ [2/2] Minifying assets with minify.exe (CSS, JS, JSON, SVG, XML, HTML)...")
  execute_process(
    COMMAND "${MINIFY_EXE}" -v -r -i "${PUBLIC_DIR}"
    WORKING_DIRECTORY "${SOURCE_DIR}"
    RESULT_VARIABLE MINIFY_RES
  )
  if(NOT MINIFY_RES EQUAL 0)
    message(WARNING "minify.exe exited with code ${MINIFY_RES}, continuing...")
  else()
    message(STATUS "   ✓ All assets minified in-place successfully.")
  endif()
else()
  message(STATUS "   ℹ minify.exe not found at ${MINIFY_EXE}; skipping deep minification.")
endif()

message(STATUS "")
message(STATUS "=================================================================")
message(STATUS "✨ Build & Minification Finished Successfully!")
message(STATUS "=================================================================")
message(STATUS "")
