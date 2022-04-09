// import useEffect hook, which runs just in the first time the render is committed to the screen, 
// to fetching all the categories
// import useState hook to create a categories state to set the categories from the DB
import React, { useEffect, useState } from 'react';

// import CategoryService class which implements CategoryApi.js to get the categories from the DB
import CategoryService from '../../../share/service/CategoryService';

// import CategoryCard component to display the categories
import CategoryCard from '../../../share/ui/cards/category_cards/CategoryCard';

// import useNavigate to redirect the user to the category coupons page after a category selection
import { useNavigate } from 'react-router-dom';

// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useDispatch } from 'react-redux';

const CategoriesViews = () => {

    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCategories() {
            await new CategoryService(dispatch)
            .getCategories()
                .then(response => {
                    if (response.succeeded) {
                        console.log('CategoriesViews.js/useEffect/fetchCategories/response: ', response.categories);
                        setCategories(response.categories);
                    } else {
                        console.log('CategoriesViews.js/useEffect/fetchCategories/response: ', response.errorMessage);
                    };
                })
                .catch(err => {
                    console.log('CategoriesViews.js/useEffect/fetchCategories/err: ', err);
                });
        };
        fetchCategories();
    }, []
    );

    const onCategoryClick = (category) => {
        navigate(`/coupons/category/coupons/${category.id}`);
    };

    return (
        <div className='category_cards-container'>
            {categories && (categories.map(category =>
                <CategoryCard
                    key={category.id}
                    category={category}
                    onClick={onCategoryClick}
                />
            ))}
        </div>
    );
};

export default CategoriesViews;