import React from 'react';

const HeaderTitle = ({ title, subtitle }) => {
    return (
        <>
            {subtitle && <p className='text-xl text-[#e58411] font-semibold uppercase mb-5'>{subtitle}</p>}
            <h3 className='text-4xl text-[#e1e1e1e] font-bold capitalize'>{title}</h3>
        </>
    );
};

export default HeaderTitle;