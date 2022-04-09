// import useEffect hook, that runs in the first time the render is committed to the screen and on any time
// the prop of the category value, that sent from CategoriesViews page, is changed, to match the image to the category
import React, { useEffect } from 'react';

// import Card from react-bootstrap to create a category cards view
import { Card } from 'react-bootstrap';

// import all categories images files
import foodCategory from '../../../../assets/img/categories/food-999-200x200.jpg';
import electricityCategory from '../../../../assets/img/categories/electricity-96-200x200.jpg';
import restaurantCategory from '../../../../assets/img/categories/restaurant-163-200x200.jpg';
import vacationCategory from '../../../../assets/img/categories/vacation-177-200x200.jpg';
import beautyCategory from '../../../../assets/img/categories/beauty-1027-200x200.jpg';
import spaCategory from '../../../../assets/img/categories/spa-31-200x200.jpg';
import shoppingCategory from '../../../../assets/img/categories/shopping-535-200x200.jpg';
import cultureCategory from '../../../../assets/img/categories/culture-453-200x200.jpg';
import healthCategory from '../../../../assets/img/categories/health-631-200x200.jpg';
import lifestyleCategory from '../../../../assets/img/categories/lifestyle-628-200x200.jpg';
import sportCategory from '../../../../assets/img/categories/sport-173-200x200.jpg';
import defaultImage from '../../../../assets/img/categories/default-200x200.jpg';

// import our custom css 
import '../../../../styles/CategoryCard.css';

const CategoryCard = (props) => {

    const matchImageToCategory = (category) => {
        switch (category.name) {
            case 'FOOD':
                return `${foodCategory}`;
            case 'ELECTRICITY':
                return `${electricityCategory}`;
            case 'RESTAURANT':
                return `${restaurantCategory}`;
            case 'VACATION':
                return `${vacationCategory}`;
            case 'BEAUTY':
                return `${beautyCategory}`;
            case 'SPA':
                return `${spaCategory}`;
            case 'SHOPPING':
                return `${shoppingCategory}`;
            case 'CULTURE':
                return `${cultureCategory}`;
            case 'HEALTH':
                return `${healthCategory}`;
            case 'LIFESTYLE':
                return `${lifestyleCategory}`;
            case 'SPORT':
                return `${sportCategory}`;
            default:
                return `${defaultImage}`;
        };
    };

    // this useEffect hook runs on mount and on any time the received property of the category changes
    // to match the matched image file from the switch case to the category
    useEffect(() => {
        matchImageToCategory(props.category);
    }, [props.category]
    );


    return (
        <Card className='category_view-card'>
            <Card.Body>
                <Card.Title className='category_view-name'
                >
                    {props.category.name}
                </Card.Title>
                <Card.Img
                    variant='bottom'
                    alt={props.category.name}
                    src={matchImageToCategory(props.category)}
                    onClick={() => props.onClick(props.category)}
                />
            </Card.Body>
        </Card>
    );
};

export default CategoryCard;