cmake_minimum_required(VERSION 3.20)
project(LinkedInLearningJavaSite NONE)

set(MSG "" CACHE STRING "Commit message for deployment")
set(PUSH_SOURCE OFF CACHE BOOL "Whether to push source repository to origin")

# Locate minify executable
find_program(MINIFY_EXE NAMES minify minify.exe PATHS "${CMAKE_CURRENT_SOURCE_DIR}" NO_DEFAULT_PATH)
if(NOT MINIFY_EXE)
  find_program(MINIFY_EXE NAMES minify minify.exe)
endif()

# Build static site with zola --minify and minify.exe
if(MINIFY_EXE)
  add_custom_target(build
    COMMAND zola build --minify
    COMMAND "${MINIFY_EXE}" -v -r -i "${CMAKE_CURRENT_SOURCE_DIR}/public"
    WORKING_DIRECTORY "${CMAKE_CURRENT_SOURCE_DIR}"
    COMMENT "Building and deeply minifying static site (zola + minify.exe)"
  )
else()
  add_custom_target(build
    COMMAND zola build --minify
    WORKING_DIRECTORY "${CMAKE_CURRENT_SOURCE_DIR}"
    COMMENT "Building static site with zola --minify"
  )
endif()

# Deployment target that invokes deploy.cmake
if(NOT "${MSG}" STREQUAL "")
  set(MSG_ARG -DMSG=${MSG})
else()
  set(MSG_ARG "")
endif()

if(PUSH_SOURCE)
  set(PUSH_SRC_ARG -DPUSH_SOURCE=ON)
else()
  set(PUSH_SRC_ARG "")
endif()

add_custom_target(deploy
  COMMAND ${CMAKE_COMMAND} ${MSG_ARG} ${PUSH_SRC_ARG} -P "${CMAKE_CURRENT_SOURCE_DIR}/deploy.cmake"
  WORKING_DIRECTORY "${CMAKE_CURRENT_SOURCE_DIR}"
  COMMENT "Deploying site to gh-pages branch"
)
