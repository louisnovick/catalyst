<?php
/**
 * Jetpack Compatibility File.
 *
 * @link https://jetpack.me/
 *
 * @package Catalyst
 */

/**
 * Add theme support for Infinite Scroll.
 * See: https://jetpack.me/support/infinite-scroll/
 */
function catalyst_jetpack_setup() {
	add_theme_support( 'infinite-scroll', array(
		'container' => 'main',
		'render'    => 'catalyst_infinite_scroll_render',
		'footer'    => 'page',
	) );
} // end function catalyst_jetpack_setup
add_action( 'after_setup_theme', 'catalyst_jetpack_setup' );

/**
 * Custom render function for Infinite Scroll.
 */
function catalyst_infinite_scroll_render() {
	while ( have_posts() ) {
		the_post();
		get_template_part( 'parts/content', get_post_format() );
	}
} // end function catalyst_infinite_scroll_render
