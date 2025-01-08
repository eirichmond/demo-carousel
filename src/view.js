/**
 * WordPress dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

const { state } = store( 'squareonesoftware', {
	actions: {
		moveBack() {
			const context = getContext();
			const itemsTotal = context.itemsTotal;
			const itemsPerView = context.itemsPerView;
			context.currentIndex = (context.currentIndex + itemsPerView) % itemsTotal;
			const offset = -context.currentIndex * (100 / itemsPerView);
			context.transform = `translateX(${offset}%)`;
		},
		moveForward() { 
			const context = getContext();
			const itemsTotal = context.itemsTotal;
			const itemsPerView = context.itemsPerView;
			context.currentIndex = (context.currentIndex - itemsPerView + itemsTotal) % itemsTotal;
			const offset = -context.currentIndex * (100 / itemsPerView);
			context.transform = `translateX(${offset}%)`;
		}
	}
} );
