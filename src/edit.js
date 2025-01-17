/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";

/**
 * React components
 */
import { PanelBody, RangeControl, SelectControl } from "@wordpress/components";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {

	const { itemsTotal, itemsPerView, currentIndex } = attributes;

	const blockProps = useBlockProps({
		style: {
			"--items-per-view": itemsPerView,
			"--current-index": currentIndex,
		},
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Carousel Settings", "demo-carousel")}>
					<RangeControl
						label={__("Total items in the slider", "demo-carousel")}
						value={itemsTotal}
						onChange={value => setAttributes({ itemsTotal: value })}
						min={1}
						max={20}
					/>
					<RangeControl
						label={__("Items Per View", "demo-carousel")}
						value={itemsPerView}
						onChange={value =>
							setAttributes({ itemsPerView: value })
						}
						min={1}
						max={10}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className='carousel-wrapper'>
					<div
						className='carousel-container'
						style={{
							transform: `translateX(${-(
								currentIndex *
								(100 / itemsPerView)
							)}%)`,
							flex: `0 0 calc( 100% / var( ${itemsPerView} ) )`,
						}}>
						{Array.from({ length: itemsTotal }).map((_, index) => (
							<div key={index} className='carousel-items'>
								{index + 1}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
