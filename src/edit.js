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
import { PanelBody, RangeControl } from "@wordpress/components";

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

	// Navigation handlers
	const moveBack = () => {
		const newIndex = (currentIndex + itemsPerView) % itemsTotal;
		setAttributes({ currentIndex: newIndex });
	};

	const moveForward = () => {
		const newIndex = (currentIndex - itemsPerView + itemsTotal) % itemsTotal;
		setAttributes({ currentIndex: newIndex });
	};

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
				<div className='carousel-navigation'>
					<svg
						width='30px'
						height='30px'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						onClick={moveBack}>
						<path
							d='M11 9L8 12M8 12L11 15M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
							stroke='#000000'
							stroke-width='2'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</svg>

					<svg
						width='30px'
						height='30px'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						onClick={moveForward}>
						<path
							d='M13 15L16 12M16 12L13 9M16 12H8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
							stroke='#000000'
							stroke-width='2'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</svg>
				</div>
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
