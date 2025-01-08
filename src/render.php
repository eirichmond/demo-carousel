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
	'transform' => 'translateX(0%)',
	'itemsTotal' => 9,
	'itemsPerView' => 3,
	'currentIndex' => 0,
);
$style = sprintf( '--items-per-view: %d', $context['itemsPerView'] );
?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="squareonesoftware"
	style="<?php echo esc_attr( $style ); ?>"
	<?php echo wp_interactivity_data_wp_context( $context ); ?>
>

	<div class="carousel-navigation">
		<button data-wp-on--click="actions.moveBack">
			<<
		</button>
	
		<button data-wp-on--click="actions.moveForward">
			>>
		</button>

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
