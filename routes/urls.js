const express = require( 'express' );

const home = require( './home' );
const student = require( './student' );
const about = require( './about' );
const research = require( './research' );
const announcement = require( './announcement' );
const resource = require( './resource' );

const router = new express.Router();

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
            dept: '資訊系 / 資訊所 / 醫資所',
            lab: '智慧型知識管理實驗室',
            locate: ' (資訊系館新大樓9F 65903)',
            specialty: '資訊檢索 / 資訊擷取、資料探勘、機器學習、全球資訊網資訊系統、生物資訊、社群網路計算',
            mail:'hykao@mail.ncku.edu.tw',
            phone:'06-2757575#62546',
            web:'http://myweb.ncku.edu.tw/~hykao/',
            education: [
                '台灣 \ 國立台灣大學 \ 電機工程 \ 博士(1999 ~ 2003)',
                '台灣 \ 國立清華大學 \ 資訊科學 \ 碩士(1994 ~ 1996)',
                '台灣 \ 國立清華大學 \ 資訊科學 \ 學士(1989 ~ 1994)'],
            experience: [
                '國立成功大學 \ 資訊工程系 \ 教授 (2014 ~ now)',
                '國立成功大學 \ 資訊工程系 \ 副教授 (2011 ~ 2014)',
                '國立成功大學 \ 資訊工程系 \ 助理教授 (2004 ~ 2011)',
                '中央研究院 \ 資訊科學所 \ 博士後研究員 (2003 ~ 2004)',
                '中央研究院 \ 資訊科學所 \ 研究助理 (1996 ~ 2003)'],
            award: [
                '國立成功大學電資學院輔導優良導師, 2014',
                '台灣綜合大學系統年輕學者創新競賽佳作獎, 2014',
                '國立成功大學教學傑出教師, 2011',
                'Reseach Grant of Intel Research Quad Core Seeding Program, 2007',
                'Biographical Listings in Marquis\'s Who\'s Who in Science and Engineering 10th Anniversary Edition, 2007-2008',
                'Research Grant of Intel Research Quad Core Seeding Program',
                'Biographical Listings in Marquis\'s Who\'s Who in Science and Engineering 9th Anniversary Edition, 2006-2007',
                '龍騰論文獎, 2003'],
            refereedPaper: [
                '1. Y.-T. Tang, H.-Y. Kao, S.-J. Tsai, H.-C. Wang "A semi-supervised, weighted pattern-learning approach for extraction of gene regulation relationships from scientific literature" nternational Journal of Data Mining and Bioinformatics, Vol. 9, No. 4SCI',
                '2. C.-H. Wei, H.-Y. Kao, Z. Lu "PubTator: a Web-based text mining tool for assisting Biocuration" Nucleic Acids Research, doi: 10.1093/nar/gkt441, 2013SCI',
                '3. C.-H. Wei, H.-Y. Kao, Z. Lu "PubTator: a Web-based text mining tool for assisting Biocuration" Nucleic Acids Research, 2013; doi: 10.1093/nar/gkt441SCI'],
            conferencePaper: [
                '1. Y.-F. Lin and H.-Y. Kao "The Retrieval of Important News Stories by Influence Propagation among Communities and Categories" Proc. of IEEE/WIC/ACM International Conference on Web Intelligence (WI-2012), Dec. 4 - Dec. 6, 2012.EI',
                '2. L.-C. Lai and H.-Y. Kao "Question Routing by Modeling User Expertise and Activity in cQA services" Proc. of the 26th Annual Conference of JSAI, Yamaguchi, Japan, 2012',
                '3. C.-H. Wei, H.-Y. Kao and Z. Lu "PubTator: A PubMed-like interactive curation system for document triage and literature curation" BioCreative 2012 workshop, Washington DC, USA, 145-150, 2012'],
            student: [
                '蔡毓娟(博3)','湯鎰聰(博2)','林致祿(博2)','魏至軒(博1)'
            ]
        }
    });
} );

module.exports = router;
