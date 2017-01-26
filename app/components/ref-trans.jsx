"use strict";
import _ from 'ramda';

const {
  insert, update, remove, prepend, append,
        view, set, lens, lensPath, lensProp, assocPath, assocProp, map, compose
      } = _;

const assertion = console.assert.bind(console);
const log = console.log.bind(console);


const state = {
  posts: [
    {
      "post":  "Pariatur exercitation ipsum cupidatat consectetur ullamco Lorem occaecat. Ut in officia exercitation mollit ipsum aliquip elit anim amet esse ea. Voluptate fugiat tempor ipsum do amet dolore dolore est adipisicing reprehenderit eu velit excepteur nisi. Officia irure aute duis est veniam.\n\nIrure velit ea sint magna exercitation ea et consectetur cupidatat duis ea est consectetur mollit. Dolore sint enim amet deserunt ex fugiat velit dolore fugiat nulla proident qui non non. Ullamco ut cillum dolor velit do amet tempor esse sit adipisicing et excepteur. Velit aliquip mollit aliquip eu aute aute veniam ex amet enim ad laboris laboris. Magna voluptate proident officia sint esse tempor excepteur velit veniam. Eu nostrud exercitation anim sunt occaecat velit occaecat nostrud eiusmod.\n\nEiusmod quis qui cupidatat anim eiusmod. Nostrud labore id commodo mollit enim amet dolore ipsum. Anim cillum officia sit ipsum magna. Anim elit in commodo proident cupidatat non sit laboris esse reprehenderit ea consequat magna eiusmod. Non quis labore in magna exercitation occaecat duis occaecat nisi. Nostrud deserunt adipisicing sit anim aute. Labore laboris officia duis sunt laborum amet consectetur irure irure ut ipsum.\n\nSint elit labore enim veniam anim excepteur id cupidatat sint aute minim id nostrud. Voluptate aliqua eu nostrud et do labore ea aute. Occaecat minim fugiat exercitation ullamco irure consectetur ad cillum sunt quis. Dolor magna voluptate Lorem non do ea minim incididunt ad officia. Ea sint nostrud cupidatat dolor ea. Consectetur tempor tempor exercitation amet aliquip. Laboris velit eiusmod irure enim adipisicing qui irure minim ex ullamco do officia.",
      "tags":  [
        "tempor",
        "pariatur",
        "sit",
        "consectetur",
        "et"
      ],
      "guid":  "8923cc26-aaa4-45a0-8cf7-70b53cc46cca",
      "index": 0,
      "_id":   "58891b24132635a1501ce860"
    },
    {
      "post":  "In est cillum proident cillum. Anim exercitation ut amet et dolore mollit id voluptate minim magna in. Excepteur amet eiusmod commodo reprehenderit sunt reprehenderit sint quis ullamco laboris. Commodo qui aute exercitation do duis adipisicing cillum qui reprehenderit sunt in fugiat nostrud. Quis exercitation deserunt exercitation officia amet.\n\nDeserunt consectetur enim sunt et nulla et minim laboris consequat nulla voluptate irure. Elit ea ea minim id cupidatat velit proident fugiat pariatur quis mollit cupidatat. Nulla Lorem incididunt ipsum eiusmod voluptate anim cupidatat velit. Velit nisi dolore veniam aliquip exercitation id elit Lorem veniam ipsum commodo magna nostrud. Tempor esse culpa do quis dolore.\n\nSunt officia elit do laborum nisi nostrud qui aliqua. Nostrud ipsum aute elit sunt aute in do exercitation sunt esse velit tempor. Exercitation cillum cupidatat officia enim. Quis quis aute cillum ipsum magna labore voluptate quis consequat consequat laboris id id laborum. Nulla incididunt excepteur cillum occaecat laboris non qui magna irure ullamco ullamco labore pariatur commodo. Dolore ea voluptate aliquip id minim sunt nisi aute in est sint minim sunt. Est velit ut non commodo qui eiusmod.\n\nIn occaecat exercitation aliquip ex irure est reprehenderit consectetur laboris sit excepteur culpa proident. Veniam aute mollit incididunt et do cupidatat. Dolor eu aliqua ex cupidatat adipisicing eu ad aliquip qui voluptate tempor et. Ex consequat sint anim proident eu sit. Consequat adipisicing proident laboris nisi sunt incididunt exercitation.",
      "tags":  [
        "reprehenderit",
        "sunt",
        "est",
        "proident",
        "aliqua"
      ],
      "guid":  "2eb04f66-64d0-4818-8adb-d7602f34ed3c",
      "index": 1,
      "_id":   "58891b24831bf568a66b2ac2"
    },
    {
      "post":  "Nostrud proident ullamco ad excepteur ipsum proident fugiat cupidatat laborum aute dolore. Anim consequat Lorem quis velit tempor enim culpa laboris aute voluptate ipsum consequat ex Lorem. Officia proident cillum sunt Lorem do nulla.\n\nOccaecat do eu culpa aute. Dolor irure et excepteur laborum aliquip. Occaecat qui id aute ipsum eu dolore aliquip ut fugiat. Non ea consectetur eu consequat pariatur pariatur commodo est ea anim aliquip veniam elit ipsum. Id magna incididunt nulla tempor nisi amet esse laboris nostrud sit nulla irure proident aute. Cupidatat fugiat eu irure incididunt culpa cillum ex commodo eiusmod id ea. Aliqua exercitation aliquip id qui ex ipsum cillum nulla tempor esse duis.\n\nVelit do voluptate irure incididunt aute quis. Esse dolore occaecat deserunt non adipisicing labore duis est sint. Exercitation aliquip labore magna tempor sint nisi laborum incididunt id excepteur deserunt magna.\n\nNostrud reprehenderit ex nulla cillum laboris anim laborum tempor Lorem mollit proident. Tempor qui anim excepteur ea enim ad dolore sit non labore nostrud. Irure laboris esse occaecat et veniam deserunt in voluptate reprehenderit ex laborum. Excepteur laborum esse fugiat aliqua occaecat id duis.",
      "tags":  [
        "enim",
        "minim",
        "eiusmod",
        "nisi",
        "elit"
      ],
      "guid":  "2d454352-1166-41d0-a7bd-936ece2d882f",
      "index": 2,
      "_id":   "58891b24912b41286155b66c"
    },
    {
      "post":  "Dolor fugiat excepteur Lorem do laborum exercitation commodo labore. Mollit dolor tempor occaecat ad sunt incididunt magna reprehenderit deserunt aliquip excepteur. Lorem aliqua aliqua eiusmod minim id ut consectetur eu. Dolor proident anim quis minim amet tempor pariatur duis. Enim fugiat irure culpa aliqua labore elit exercitation Lorem fugiat ea fugiat aute reprehenderit aliqua. Culpa nostrud ex deserunt amet velit veniam aliqua deserunt nisi occaecat elit eu. Velit et dolor enim magna exercitation laboris culpa ut consectetur sunt irure labore.\n\nEa magna occaecat fugiat dolore mollit aliquip enim quis voluptate ipsum labore labore cupidatat elit. Non in sint magna Lorem ex ipsum consectetur. Est et ipsum irure excepteur non Lorem commodo tempor laboris ea anim ut ea voluptate. Fugiat deserunt occaecat culpa duis reprehenderit eiusmod. Incididunt adipisicing proident deserunt minim commodo ad non officia. Labore nisi irure id amet ex.\n\nAliqua reprehenderit quis amet fugiat sit cillum ad fugiat irure reprehenderit ad nisi veniam excepteur. Proident amet magna deserunt magna aliqua magna in sit in sunt. Et officia consequat minim occaecat commodo ipsum. Fugiat quis enim aliqua velit labore proident sunt consectetur.\n\nIpsum cillum cupidatat officia nulla non consequat. Esse enim amet mollit dolor. Aute nostrud adipisicing voluptate laborum ad excepteur dolor laborum tempor cillum. Proident cillum velit nisi officia irure incididunt est ea consectetur id duis nulla fugiat. Cillum fugiat dolor tempor minim do commodo do. Fugiat sint velit Lorem velit nostrud esse id cupidatat deserunt do minim.",
      "tags":  [
        "dolore",
        "non",
        "aute",
        "eiusmod",
        "et"
      ],
      "guid":  "311c2138-c78e-4757-91f9-bca7a42fe85e",
      "index": 3,
      "_id":   "58891b2407d16f88c9c600ec"
    },
    {
      "post":  "Occaecat incididunt commodo et minim culpa incididunt culpa Lorem voluptate exercitation consectetur anim ad laborum. Sint in minim culpa exercitation consequat occaecat consectetur anim consequat enim sunt qui. Qui quis velit voluptate sit enim sit cillum do proident mollit. Aute ut fugiat proident incididunt magna ullamco pariatur magna. Qui deserunt aute ex Lorem qui aliqua commodo consectetur laboris nostrud sit nulla eiusmod ipsum.\n\nUt fugiat et laborum aliqua. Cupidatat eiusmod Lorem eiusmod ipsum excepteur nisi elit quis aliquip ullamco nostrud minim. Eu qui duis qui aute id. Minim sint eu sint sit et quis in sint enim labore nisi quis et.\n\nMollit ullamco laboris aliqua mollit adipisicing tempor do. Consequat pariatur elit et aute proident qui veniam proident deserunt laborum dolor voluptate ad incididunt. Est pariatur eiusmod Lorem nisi nostrud id enim pariatur et excepteur. Sint Lorem anim et nisi anim do duis. Aliqua amet aute irure consequat.\n\nCommodo exercitation quis adipisicing et quis minim magna sint ea elit non consequat culpa do. Enim mollit eiusmod ea sunt. Adipisicing cillum aliqua dolor aliqua exercitation excepteur reprehenderit eiusmod commodo et qui. Non aliquip ex laborum aliquip tempor quis ad. Tempor magna dolor incididunt ullamco tempor. Qui ex nisi veniam adipisicing veniam id sit consequat aute.",
      "tags":  [
        "cupidatat",
        "consectetur",
        "qui",
        "exercitation",
        "aute"
      ],
      "guid":  "38811dd4-389b-4246-8dfb-d900637cd8f6",
      "index": 4,
      "_id":   "58891b2478a9ad52d87c186b"
    },
    {
      "post":  "Anim reprehenderit labore ex nisi incididunt ipsum duis laborum anim deserunt culpa Lorem velit. Ex ad duis consectetur exercitation aliquip ex ullamco sit elit excepteur qui. Id voluptate nulla esse cillum sunt aliqua. Est officia exercitation dolore incididunt aliquip voluptate aliqua anim dolore cillum ut nulla dolor exercitation. Adipisicing minim eu velit aliqua non nisi velit ad aliquip est officia esse consectetur aliquip. Nisi esse culpa sit aliquip laboris deserunt dolor deserunt excepteur voluptate aute eu veniam esse.\n\nMollit duis et exercitation aliqua elit minim magna eu sint. Cupidatat adipisicing excepteur esse quis esse proident adipisicing eiusmod labore culpa quis reprehenderit deserunt. Id consectetur deserunt ea in qui mollit amet aliquip magna consequat ut.\n\nConsequat nostrud non aute duis fugiat. Officia excepteur eu laboris sunt do esse. In minim nostrud occaecat enim culpa exercitation mollit occaecat consectetur voluptate. Voluptate veniam ex eu et nostrud. Lorem irure laborum irure magna elit proident veniam aliqua sint. Ut eiusmod eu do nostrud et id labore. Do commodo dolore aliquip velit mollit commodo qui tempor proident esse quis cupidatat.\n\nOfficia nostrud eiusmod sint ullamco pariatur consequat non velit nisi laborum laborum. Duis nostrud mollit nulla consequat nostrud sit ad adipisicing fugiat fugiat officia aliqua laborum. Exercitation eu ad magna et quis reprehenderit nisi qui dolore commodo velit ullamco veniam consequat. Amet velit culpa consectetur minim sint aliqua occaecat nostrud pariatur laborum proident ex laborum mollit. Ipsum duis velit do cupidatat. Ex exercitation laborum qui nostrud cillum occaecat consequat voluptate quis. Labore incididunt aute est enim aliqua nostrud magna nisi est do labore aute in ex.",
      "tags":  [
        "aliqua",
        "labore",
        "labore",
        "cillum",
        "amet"
      ],
      "guid":  "b170c6bf-b405-4ccb-b438-342dba1be04f",
      "index": 5,
      "_id":   "58891b242cf8b083114330fc"
    },
    {
      "post":  "Dolore occaecat Lorem sunt mollit minim sit id et veniam adipisicing. Exercitation sunt dolor amet laborum nisi consectetur commodo ut non Lorem excepteur excepteur fugiat. Nisi incididunt exercitation pariatur duis cupidatat id culpa sit ullamco ad dolor consequat magna. Non dolore aliquip eiusmod esse consectetur non mollit amet dolor. Ipsum est aliqua officia amet. Excepteur sunt do aute officia culpa ut eu consectetur irure sit. Ex veniam voluptate culpa dolore esse aute ea esse.\n\nCillum reprehenderit anim quis id minim sint minim cupidatat esse quis id. Labore tempor ea id tempor velit ex ullamco aliquip incididunt velit ipsum. Enim proident incididunt sint adipisicing dolor eiusmod qui sunt sit eiusmod exercitation. Eiusmod ad magna in veniam occaecat et. Sit ipsum eiusmod velit et tempor deserunt non consequat labore elit. Anim aliquip consectetur mollit consectetur est quis aliquip do ad qui dolore Lorem adipisicing. Sunt cupidatat sint sit ipsum nostrud.\n\nEu nisi cillum nostrud laborum nisi ea id sunt reprehenderit tempor tempor sit sit esse. Deserunt sunt eiusmod exercitation veniam ullamco ex deserunt mollit cupidatat aliquip adipisicing tempor adipisicing. Qui officia deserunt consequat esse consequat eu culpa do culpa eiusmod tempor sit in id. Dolor ut aliqua adipisicing nulla minim. Eu esse eiusmod enim ad eu ullamco. Sint tempor nostrud reprehenderit Lorem mollit enim exercitation minim eiusmod Lorem. Incididunt occaecat cupidatat tempor enim ipsum minim mollit duis officia.\n\nNon ea do cillum reprehenderit aliqua aute do ut officia consectetur magna exercitation laborum ea. Amet ipsum est aliqua ex anim. Irure culpa deserunt dolore mollit cupidatat cillum cupidatat. Eu culpa velit occaecat dolor aliqua dolore quis irure sint occaecat esse elit cillum. Eiusmod Lorem ipsum excepteur exercitation sunt laborum incididunt sunt nisi. Enim dolor quis fugiat elit in proident ex consequat ullamco. Eiusmod ex Lorem occaecat occaecat.",
      "tags":  [
        "consequat",
        "ea",
        "eu",
        "esse",
        "sint"
      ],
      "guid":  "77c95058-1e2b-4984-ab58-cb1d4249f66b",
      "index": 6,
      "_id":   "58891b2452253ffbc0b7f5e2"
    },
    {
      "post":  "Quis fugiat ex ex dolor cupidatat et consectetur eu elit. In nostrud ipsum sunt id quis. Aute dolor duis minim elit id aliqua qui do. Consectetur nisi irure aliquip incididunt sint incididunt nulla nisi. Excepteur et proident voluptate proident consequat magna aliquip quis consequat ea amet aute officia eu.\n\nLorem ullamco nulla ipsum tempor aliqua magna sunt. Consequat aliqua ullamco exercitation nostrud excepteur nostrud. Incididunt voluptate in ea sunt nisi do aute pariatur pariatur. In cillum eiusmod et minim proident labore elit enim eu laborum amet. Proident dolore sit magna proident cillum eiusmod amet eiusmod ad nisi. Laboris consequat eu magna et.\n\nDo excepteur qui veniam esse veniam qui reprehenderit. Tempor anim nulla deserunt aliqua deserunt consectetur ea laboris consequat occaecat elit esse velit. Anim labore ea quis voluptate aliquip mollit enim. Est aliqua ea consectetur sint sunt est eiusmod cillum ipsum amet duis.\n\nReprehenderit laborum non duis reprehenderit ullamco non commodo. Labore aute est amet enim consectetur magna incididunt voluptate ad ipsum nostrud est enim. Minim proident adipisicing deserunt dolore in elit. Et sit tempor enim proident in eiusmod consequat sint incididunt nulla dolor veniam ea. Anim aliquip tempor Lorem officia quis cillum excepteur. Adipisicing duis non irure et. Culpa Lorem exercitation laboris id consequat elit fugiat occaecat velit voluptate magna tempor officia.",
      "tags":  [
        "cillum",
        "reprehenderit",
        "deserunt",
        "consequat",
        "consequat"
      ],
      "guid":  "5fc8b736-f740-4dc7-b821-7e8e69056ca0",
      "index": 7,
      "_id":   "58891b2548505a7fc0115c61"
    },
    {
      "post":  "Eu labore incididunt esse cupidatat consectetur aliquip Lorem excepteur ullamco occaecat dolor quis eiusmod nisi. Nisi proident adipisicing incididunt exercitation culpa. Labore quis adipisicing aliquip irure consectetur adipisicing esse ex. Nisi fugiat aliquip fugiat do sunt ipsum adipisicing magna quis excepteur do consequat. Consequat occaecat reprehenderit minim irure excepteur dolore et. Do consequat anim duis dolor laboris proident nostrud officia minim Lorem sit ex. Deserunt nisi adipisicing anim velit labore culpa eiusmod eu nulla id ut.\n\nDeserunt laborum amet aute quis consectetur tempor Lorem nulla non labore incididunt cillum excepteur magna. Voluptate tempor culpa nisi in aute dolore id pariatur laborum anim est incididunt. Lorem occaecat minim velit nisi sint ut ipsum do aliqua fugiat.\n\nLabore ad id do fugiat eiusmod enim excepteur irure minim nostrud. Lorem enim nulla elit deserunt eu proident elit mollit sint irure Lorem veniam. Culpa voluptate consectetur ea officia anim dolor cillum officia adipisicing sit consequat.\n\nAdipisicing duis ipsum veniam occaecat. Sit nostrud in laboris incididunt sunt incididunt nisi minim voluptate exercitation deserunt dolor veniam. Adipisicing id cupidatat enim eiusmod nostrud consequat proident minim nostrud quis occaecat consequat.",
      "tags":  [
        "et",
        "magna",
        "reprehenderit",
        "reprehenderit",
        "dolor"
      ],
      "guid":  "c7a2eb07-9385-4580-a9bd-d52e9a961064",
      "index": 8,
      "_id":   "58891b2595ddf281a674280a"
    },
    {
      "post":  "Cupidatat consectetur quis qui ea proident magna cillum. Amet elit sint occaecat eiusmod aliqua nulla. Ea elit ut adipisicing elit cillum voluptate voluptate in. Tempor non ullamco proident nulla reprehenderit exercitation minim cupidatat eu. Quis labore exercitation velit reprehenderit sint exercitation officia sunt laborum dolor exercitation tempor ad. Cupidatat sunt incididunt nulla officia consequat aute irure.\n\nDeserunt aliqua sint elit minim commodo consequat ex esse magna veniam eiusmod tempor adipisicing esse. Anim ea mollit elit dolore pariatur est magna officia anim in nulla. Quis ullamco mollit aliqua commodo esse culpa mollit pariatur cupidatat.\n\nOfficia commodo minim ea nostrud voluptate sunt amet sint. Exercitation officia consequat ad et ex et ad incididunt. Est enim do occaecat aute deserunt id culpa quis Lorem.\n\nQuis non pariatur velit ipsum id ipsum dolor tempor tempor eu ipsum reprehenderit veniam. Dolor adipisicing Lorem velit mollit elit ex mollit nisi. Lorem nulla nostrud commodo et voluptate in.",
      "tags":  [
        "incididunt",
        "labore",
        "enim",
        "aliqua",
        "voluptate"
      ],
      "guid":  "4a530cd3-e4bf-4f55-ab1f-1b637dff5098",
      "index": 9,
      "_id":   "58891b25fb8c69fe146e5cad"
    }
  ],
  users: ['Tiger', 'Kitty', 'Snow', 'Butters']
};


export default function refTrans() {
}
