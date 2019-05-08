import Sequelize from 'sequelize';
import { user, } from 'models/common/utils/connect.js';

const Session = user.define( 'session', {
    sid: {
        type:       Sequelize.STRING( 36 ),
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
    testcol: {
        type:      Sequelize.STRING( 45 ),
        allowNull:  true,
    },
} );

export default Session;
