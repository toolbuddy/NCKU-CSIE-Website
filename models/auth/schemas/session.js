import Sequelize from 'sequelize';
import { user, } from 'models/common/utils/connect.js';

const Session = user.define( 'session', {
    sid: {
        type:       Sequelize.STRING( 45 ),
        primaryKey: true,
        allowNull:  false,
    },
    expires: {
        type:       Sequelize.DATE,
        allowNull:  true,
    },
    data:    {
        type:       Sequelize.TEXT,
        allowNull:  true,
    },
} );

export default Session;
