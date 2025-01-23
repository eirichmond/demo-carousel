import { registerBlockVariation } from "@wordpress/blocks";

// Register the block variation
registerBlockVariation("core/query", {
	name: "demo-carousel",
	title: __("Query Loop Carousel", "demo-slider-variation"),
	attributes: {
		className: "demo-carousel",
		itemsToShow: {
			type: "number",
			default: 3,
		},
	},
	innerBlocks: [
		{
			name: "core/buttons",
			innerBlocks: [
				{
					name: "core/button",
					attributes: {
						className: "carousel-prev",
					},
					
				},
				{
					name: "core/button",
					attributes: {
						className: "carousel-next",
					},
				},
			],
		},
		{
			name: "core/post-template",
			attributes: {
				className: "carousel-post-template",
			},
		},
	],
	isDefault: false,
});
