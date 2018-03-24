const express = require( 'express' );

const home = require( './home' );
const student = require( './student' );
const about = require( './about' );
const research = require( './research' );
const announcement = require( './announcement' );
const resource = require( './resource' );

const router = express.Router();

router.use( '/', home );
// route to pages belongs to /student
router.use( '/student', student );
// route to pages belongs to /about
router.use( '/about', about );
// route to pages belongs to /research
router.use( '/research', research );
// route to pages belongs to /announcement
router.use( '/announcement', announcement );
// route to pages belongs to /resource
router.use( '/resource', resource );

router.get( '/teacher', function( req, res ) {
    res.render( 'about/teacher' ,
    {
        T:
        {
            c_name: '高宏宇',
            c_title_name: ['教授','系主任','醫資所所長'],
            specialty: 
            [
                '資訊檢索 / 資訊擷取、資料探勘、機器學習、全球資訊網資訊系統、生物資訊、社群網路計算'
            ],
            education:
            [
                '台灣 \ 國立台灣大學 \ 電機工程 \ 博士(1999 ~ 2003)',
                '台灣 \ 國立清華大學 \ 資訊科學 \ 碩士(1994 ~ 1996)',
                '台灣 \ 國立清華大學 \ 資訊科學 \ 學士(1989 ~ 1994)'
            ],
            experience:
            [
                '國立成功大學 \ 資訊工程系 \ 教授 (2014 ~ now)',
                '國立成功大學 \ 資訊工程系 \ 副教授 (2011 ~ 2014)',
                '國立成功大學 \ 資訊工程系 \ 助理教授 (2004 ~ 2011)',
                '中央研究院 \ 資訊科學所 \ 博士後研究員 (2003 ~ 2004)',
                '中央研究院 \ 資訊科學所 \ 研究助理 (1996 ~ 2003)'
            ]
        }
    });
} );

module.exports = router;
