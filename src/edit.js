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
import { useBlockProps, InspectorControls, BlockContextProvider, useInnerBlocksProps } from "@wordpress/block-editor";

/**
 * React components
 */
import { PanelBody, RangeControl, SelectControl, Spinner } from "@wordpress/components";

/**
 * React data
 */
import { useSelect } from "@wordpress/data";

/**
 * React element
 */
import { useMemo } from "@wordpress/element";

/**
 * Default InnerBlocks template
 */
const TEMPLATE = [
	["core/post-title"],
	["core/post-content"],
];

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
	const { itemsTotal, itemsPerView, currentIndex, postType } = attributes;

	const blockProps = useBlockProps({
		style: {
			"--items-per-view": itemsPerView,
			"--current-index": currentIndex,
		},
	});

	// Fetch all post types dynamically
	const postTypes = useSelect(select => {
		const types = select("core").getPostTypes({ per_page: -1 });
		return types?.filter(type => !type.viewable === false); // Only include viewable post types
	}, []);

	// Navigation handlers
	const moveBack = () => {
		const newIndex = (currentIndex + itemsPerView) % itemsTotal;
		setAttributes({ currentIndex: newIndex });
	};

	const moveForward = () => {
		const newIndex =
			(currentIndex - itemsPerView + itemsTotal) % itemsTotal;
		setAttributes({ currentIndex: newIndex });
	};

	// Fetch posts dynamically for the selected post type
	const posts = useSelect(
		select => {
			if (!postType) return [];
			return select("core").getEntityRecords("postType", postType, {
				per_page: itemsTotal,
			});
		},
		[postType, itemsTotal]
	);

	// Map posts to block contexts
	const blockContexts = useMemo(
		() =>
			posts?.map(post => ({
				postType: post.type,
				postId: post.id,
			})),
		[posts]
	);

	// Handle loading state
	if (!posts) {
		return (
			<div {...blockProps}>
				<Spinner />
			</div>
		);
	}

	// Handle no posts found
	if (!posts.length) {
		return (
			<div {...blockProps}>
				<p>{__("No posts found.", "demo-carousel")}</p>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Carousel Settings", "demo-carousel")}>
					<SelectControl
						label={__("Post Type", "demo-carousel")}
						value={postType}
						options={[
							{
								label: __(
									"Select a post type",
									"demo-carousel"
								),
								value: "",
							},
							...(postTypes?.map(type => ({
								label: type.labels?.singular_name || type.name,
								value: type.slug,
							})) || []),
						]}
						onChange={value => setAttributes({ postType: value })}
					/>
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
								{blockContexts[index] ? (
									<BlockContextProvider
										value={blockContexts[index]}>
										<PostTemplateInnerBlocks />
									</BlockContextProvider>
								) : (
									<Spinner />
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

// Render individual items with a post template
function PostTemplateInnerBlocks() {
	const innerBlocksProps = useInnerBlocksProps(
		{ className: "carousel-post-template" },
		{
			template: TEMPLATE,
			allowedBlocks: ["core/post-title", "core/post-content"],
			__unstableDisableLayoutClassNames: true, // Avoid layout-specific classnames
		}
	);

	return <div {...innerBlocksProps} />;
}
