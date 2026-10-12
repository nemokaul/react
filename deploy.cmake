# ==============================================================================
# CMake Automated Build & Deploy Script for LinkedIn Learning React Course Site
# ==============================================================================
# Usage:
#   cmake -DMSG="Your commit message" -P deploy.cmake
#   cmake -P deploy.cmake
# ==============================================================================

cmake_minimum_required(VERSION 3.20)

# Paths configuration
set(SOURCE_DIR "${CMAKE_CURRENT_LIST_DIR}")
set(PUBLIC_DIR "${SOURCE_DIR}/public")
set(TARGET_DIR "C:/Users/admin/Downloads/reaact-docs/react-gh-pages")

# 1. Determine Commit Message
if(NOT DEFINED MSG OR "${MSG}" STREQUAL "")
  if(DEFINED ENV{MSG} AND NOT "$ENV{MSG}" STREQUAL "")
    set(MSG "$ENV{MSG}")
  else()
    string(TIMESTAMP CURRENT_TIME "%Y-%m-%d %H:%M:%S")
    set(MSG "feat(site): update React course curriculum and summary notes [${CURRENT_TIME}]")
  endif()
endif()

message(STATUS "")
message(STATUS "=================================================================")
message(STATUS "  LinkedIn Learning React Course Site - Automated Deployment")
message(STATUS "=================================================================")
message(STATUS " Commit message : ${MSG}")
message(STATUS " Source Repo    : ${SOURCE_DIR}")
message(STATUS " Target Repo    : ${TARGET_DIR}")
message(STATUS " Public Folder  : ${PUBLIC_DIR}")
message(STATUS "=================================================================")
message(STATUS "")

# ------------------------------------------------------------------------------
# STEP 1: Commit Current Changes in Source Repository (zola-tailwind-site)
# ------------------------------------------------------------------------------
message(STATUS "📦 [1/7] Staging changes in source repository...")
execute_process(
  COMMAND git add -A
  WORKING_DIRECTORY "${SOURCE_DIR}"
  RESULT_VARIABLE GIT_ADD_RES
)
if(NOT GIT_ADD_RES EQUAL 0)
  message(FATAL_ERROR "Failed to stage changes in source repo: ${SOURCE_DIR}")
endif()

execute_process(
  COMMAND git status --porcelain
  WORKING_DIRECTORY "${SOURCE_DIR}"
  OUTPUT_VARIABLE SOURCE_STATUS_OUT
)
string(STRIP "${SOURCE_STATUS_OUT}" SOURCE_STATUS_OUT)

if(NOT "${SOURCE_STATUS_OUT}" STREQUAL "")
  message(STATUS "💾 [1/7] Committing changes in source repository...")
  execute_process(
    COMMAND git commit -m "${MSG}"
    WORKING_DIRECTORY "${SOURCE_DIR}"
    RESULT_VARIABLE SOURCE_COMMIT_RES
  )
  if(NOT SOURCE_COMMIT_RES EQUAL 0)
    message(FATAL_ERROR "Failed to commit in source repo: ${SOURCE_DIR}")
  endif()
  message(STATUS "   ✓ Committed changes in source repository.")
else()
  message(STATUS "   ℹ No uncommitted changes in source repository.")
endif()

# ------------------------------------------------------------------------------
# STEP 2: Run Zola Build with --minify
# ------------------------------------------------------------------------------
message(STATUS "🔨 [2/7] Building static site: zola build --minify...")
execute_process(
  COMMAND zola build --minify
  WORKING_DIRECTORY "${SOURCE_DIR}"
  RESULT_VARIABLE ZOLA_BUILD_RES
)
if(NOT ZOLA_BUILD_RES EQUAL 0)
  message(FATAL_ERROR "zola build --minify failed with exit code: ${ZOLA_BUILD_RES}")
endif()
message(STATUS "   ✓ Zola build completed successfully.")

# ------------------------------------------------------------------------------
# STEP 3: Deep Minify All CSS, JS, JSON, SVG, XML & HTML Files with minify.exe
# ------------------------------------------------------------------------------
set(MINIFY_EXE "${SOURCE_DIR}/minify.exe")
if(NOT EXISTS "${MINIFY_EXE}")
  find_program(MINIFY_EXE NAMES minify minify.exe)
endif()

if(EXISTS "${MINIFY_EXE}")
  message(STATUS "⚡ [3/7] Minifying assets with minify.exe (CSS, JS, JSON, SVG, XML, HTML)...")
  execute_process(
    COMMAND "${MINIFY_EXE}" -v -r -i "${PUBLIC_DIR}"
    WORKING_DIRECTORY "${SOURCE_DIR}"
    RESULT_VARIABLE MINIFY_RES
  )
  if(NOT MINIFY_RES EQUAL 0)
    message(WARNING "minify.exe exited with code ${MINIFY_RES}, continuing deployment...")
  else()
    message(STATUS "   ✓ All static assets minified in-place successfully.")
  endif()
else()
  message(STATUS "   ℹ minify.exe not found; skipping deep asset minification.")
endif()

# ------------------------------------------------------------------------------
# STEP 4: Ensure Target Repository is on gh-pages Branch
# ------------------------------------------------------------------------------
message(STATUS "🌿 [4/7] Verifying target repository git branch...")
if(NOT EXISTS "${TARGET_DIR}/.git")
  message(FATAL_ERROR "Target directory is not a git repository: ${TARGET_DIR}")
endif()

execute_process(
  COMMAND git checkout gh-pages
  WORKING_DIRECTORY "${TARGET_DIR}"
  RESULT_VARIABLE TARGET_CHECKOUT_RES
)
if(NOT TARGET_CHECKOUT_RES EQUAL 0)
  message(FATAL_ERROR "Failed to checkout 'gh-pages' branch in target repo: ${TARGET_DIR}")
endif()
message(STATUS "   ✓ Target repository is on 'gh-pages' branch.")

# ------------------------------------------------------------------------------
# STEP 5: Copy Built Files from public/ to Target Directory
# ------------------------------------------------------------------------------
message(STATUS "📂 [5/7] Syncing public/ files to target repository...")
if(NOT EXISTS "${PUBLIC_DIR}")
  message(FATAL_ERROR "Public directory does not exist: ${PUBLIC_DIR}")
endif()

# Clean existing generated files in TARGET_DIR while strictly preserving .git, .gitignore, CNAME, README.md
file(GLOB TARGET_CONTENTS LIST_DIRECTORIES true "${TARGET_DIR}/*")
foreach(ITEM ${TARGET_CONTENTS})
  get_filename_component(ITEM_NAME "${ITEM}" NAME)
  if(NOT "${ITEM_NAME}" STREQUAL ".git" AND NOT "${ITEM_NAME}" STREQUAL ".gitignore" AND NOT "${ITEM_NAME}" STREQUAL "CNAME" AND NOT "${ITEM_NAME}" STREQUAL "README.md")
    file(REMOVE_RECURSE "${ITEM}")
  endif()
endforeach()

# Copy public/ to target directory
execute_process(
  COMMAND ${CMAKE_COMMAND} -E copy_directory "${PUBLIC_DIR}" "${TARGET_DIR}"
  RESULT_VARIABLE COPY_DIR_RES
)
if(NOT COPY_DIR_RES EQUAL 0)
  message(FATAL_ERROR "Failed to copy ${PUBLIC_DIR} to ${TARGET_DIR}")
endif()

# Ensure .nojekyll exists in TARGET_DIR so GitHub Pages serves raw files properly
file(WRITE "${TARGET_DIR}/.nojekyll" "")
message(STATUS "   ✓ Files synchronized to target repository (with .nojekyll).")

# ------------------------------------------------------------------------------
# STEP 6: Stage and Commit Changes in Target Repository with Same Commit Message
# ------------------------------------------------------------------------------
message(STATUS "📝 [6/7] Staging and committing changes in target repository...")
execute_process(
  COMMAND git add -A
  WORKING_DIRECTORY "${TARGET_DIR}"
  RESULT_VARIABLE TARGET_ADD_RES
)
if(NOT TARGET_ADD_RES EQUAL 0)
  message(FATAL_ERROR "Failed to stage changes in target repository: ${TARGET_DIR}")
endif()

execute_process(
  COMMAND git status --porcelain
  WORKING_DIRECTORY "${TARGET_DIR}"
  OUTPUT_VARIABLE TARGET_STATUS_OUT
)
string(STRIP "${TARGET_STATUS_OUT}" TARGET_STATUS_OUT)

if(NOT "${TARGET_STATUS_OUT}" STREQUAL "")
  execute_process(
    COMMAND git commit -m "${MSG}"
    WORKING_DIRECTORY "${TARGET_DIR}"
    RESULT_VARIABLE TARGET_COMMIT_RES
  )
  if(NOT TARGET_COMMIT_RES EQUAL 0)
    message(FATAL_ERROR "Failed to commit changes in target repo: ${TARGET_DIR}")
  endif()
  message(STATUS "   ✓ Committed changes to target repository.")
else()
  message(STATUS "   ℹ Target repository has no changes to commit.")
endif()

# ------------------------------------------------------------------------------
# STEP 7: Push Changes to Remote gh-pages Branch
# ------------------------------------------------------------------------------
message(STATUS "🚀 [7/7] Pushing to origin gh-pages...")
execute_process(
  COMMAND git push origin gh-pages
  WORKING_DIRECTORY "${TARGET_DIR}"
  RESULT_VARIABLE TARGET_PUSH_RES
)
if(NOT TARGET_PUSH_RES EQUAL 0)
  message(FATAL_ERROR "Failed to push gh-pages to origin.")
endif()
message(STATUS "   ✓ Pushed successfully to origin gh-pages.")

# Optional: Push source repository to origin if requested
if(PUSH_SOURCE)
  message(STATUS "🚀 Pushing source repository to origin...")
  execute_process(
    COMMAND git push origin HEAD
    WORKING_DIRECTORY "${SOURCE_DIR}"
    RESULT_VARIABLE SOURCE_PUSH_RES
  )
  if(SOURCE_PUSH_RES EQUAL 0)
    message(STATUS "   ✓ Source repository pushed to origin.")
  else()
    message(WARNING "Failed to push source repository to origin.")
  endif()
endif()

message(STATUS "")
message(STATUS "=================================================================")
message(STATUS "🎉 Deployment Successful! The site is updated and live.")
message(STATUS "=================================================================")
message(STATUS "")
