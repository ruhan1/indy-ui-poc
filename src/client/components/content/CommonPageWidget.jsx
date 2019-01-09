import React from 'react';
import PropTypes from 'prop-types';
import {Utils} from '../CompUtils.js';

const LocalURLSection = ({storeKey}) => <div className="left-half">
        <label>Local URL:</label>{' '}
        <a href={Utils.storeHref(storeKey)} target="_new">{Utils.storeHref(storeKey)}</a>
    </div>;

LocalURLSection.propTypes = {
    storeKey: PropTypes.string
};

export {LocalURLSection};
