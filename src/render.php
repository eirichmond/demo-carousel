<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$context = array(
	'transform'    => 'translateX(0%)',
	'itemsTotal'   => 9,
	'itemsPerView' => 3,
	'currentIndex' => 0,
);
$style   = sprintf( '--items-per-view: %d', $context['itemsPerView'] );
?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="squareonesoftware"
	style="<?php echo esc_attr( $style ); ?>"
	<?php echo wp_interactivity_data_wp_context( $context ); ?>
>

	<div class="carousel-navigation">

		<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-wp-on--click="actions.moveBack">
		<path d="M11 9L8 12M8 12L11 15M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	
		<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  data-wp-on--click="actions.moveForward">
		<path d="M13 15L16 12M16 12L13 9M16 12H8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>

	</div>	

	<div class="carousel-wrapper">
		<div data-wp-style--transform="context.transform" class="carousel-container">
			<div class="carousel-items">1</div>
			<div class="carousel-items">2</div>
			<div class="carousel-items">3</div>
			<div class="carousel-items">4</div>
			<div class="carousel-items">5</div>
			<div class="carousel-items">6</div>
			<div class="carousel-items">7</div>
			<div class="carousel-items">8</div>
			<div class="carousel-items">9</div>
		</div>
	</div>
</div>
