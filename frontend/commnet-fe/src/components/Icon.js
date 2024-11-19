import React from 'react';
import * as Icons from 'react-bootstrap-icons';

function Icon({ name, color = 'currentColor', size = 16 }) {
    const BootstrapIcon = Icons[name];
    return BootstrapIcon ? <BootstrapIcon color={color} size={size} /> : null;
}

export default Icon;