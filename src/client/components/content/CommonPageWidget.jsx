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

const CapabilitiesSection = ({options}) => <div className="left-half">
    <label>Capabilities:</label>{' '}
    {
        options.map(option => <div key={option.title} className="options">
                <span className="key">{option.icon} </span>
            </div>)
    }
    </div>;

CapabilitiesSection.propTypes = {
    options: PropTypes.array
};

export {LocalURLSection, CapabilitiesSection};
