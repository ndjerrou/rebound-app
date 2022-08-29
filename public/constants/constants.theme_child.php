<?php

/**
 * Theme version.
 *
 * @var string
 */
define("RB_VERSION", "1.0.0");

/**
 * Theme text domain.
 *
 * @var string
 */
define("RB_TEXTDOMAIN", "rebound");

/**
 * API rest namespace.
 *
 * @var string
 */
define("RB_REST_NAMESPACE", "rb/v1");

/**
 * Theme path directory.
 *
 * @var function get_stylesheet_directory()
 * @return string
 */
define("RB_PATH", get_stylesheet_directory());

/**
 * Theme path url.
 *
 * @var function get_stylesheet_directory_uri()
 * @return string
 */
define("RB_URL", get_stylesheet_directory_uri());

/**
 * Addons path directory.
 *
 * @var string
 */
define("RB_ADDONS_PATH", RB_PATH . "/addons");

/**
 * Addons path url.
 *
 * @var string
 */
define("RB_ADDONS_URL", RB_URL . "/addons");
