var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var API_URL = 'https://picsum.photos/v2/list?page=2&limit=100';
var IS_MODALE_OPEN = false;
// DOM Elements
var CLOSE_MODALE = document.querySelector(".CLOSE_MODALE");
var LIGHT_BOX = document.querySelector(".LIGHT_BOX");
var LIGHT_IMAGE_CONTAINER = document.querySelector(".LIGHT_BOX_IMAGE");
var IMAGE_CONTAINER = document.querySelector(".IMAGE_CONTAINER");
var SLIDE_IMAGE_BTN = document.querySelectorAll(".IMG_CONTROLLER");
// Fetch images from API
function FETCH_IMAGES() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(API_URL)];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error('Failed to fetch images');
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    SHOW_IMAGES(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching images:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Display images in grid
function SHOW_IMAGES(images) {
    IMAGE_CONTAINER.innerHTML = "";
    images.forEach(function (img) {
        var imgElement = document.createElement("img");
        imgElement.src = img.download_url;
        imgElement.alt = img.author;
        imgElement.addEventListener("click", function (e) {
            var target = e.target;
            target.classList.add("ACTIVE_IMAGE");
            IS_MODALE_OPEN = true;
            LIGHT_BOX.style.display = "flex";
            LIGHT_IMAGE_CONTAINER.src = target.src;
        });
        IMAGE_CONTAINER.appendChild(imgElement);
    });
}
// Close modal handlers
CLOSE_MODALE.addEventListener("click", function () {
    var _a;
    IS_MODALE_OPEN = false;
    LIGHT_BOX.style.display = "none";
    (_a = document.querySelector(".ACTIVE_IMAGE")) === null || _a === void 0 ? void 0 : _a.classList.remove("ACTIVE_IMAGE");
});
// Close modal when clicking outside
document.addEventListener("click", function (e) {
    var _a;
    if (IS_MODALE_OPEN && e.target === LIGHT_BOX) {
        IS_MODALE_OPEN = false;
        LIGHT_BOX.style.display = "none";
        (_a = document.querySelector(".ACTIVE_IMAGE")) === null || _a === void 0 ? void 0 : _a.classList.remove("ACTIVE_IMAGE");
    }
});
// Image navigation controls
SLIDE_IMAGE_BTN.forEach(function (BTN) {
    BTN.addEventListener("click", function () {
        var ACTIVE_IMAGE_ELEMENT = document.querySelector(".ACTIVE_IMAGE");
        if (!ACTIVE_IMAGE_ELEMENT)
            return;
        var newActiveElement = null;
        if (BTN.classList.contains("RIGHT")) {
            newActiveElement = ACTIVE_IMAGE_ELEMENT.nextElementSibling;
        }
        else if (BTN.classList.contains("LEFT")) {
            newActiveElement = ACTIVE_IMAGE_ELEMENT.previousElementSibling;
        }
        if (newActiveElement) {
            ACTIVE_IMAGE_ELEMENT.classList.remove("ACTIVE_IMAGE");
            newActiveElement.classList.add("ACTIVE_IMAGE");
            LIGHT_IMAGE_CONTAINER.src = newActiveElement.src;
        }
    });
});
// Initialize
FETCH_IMAGES();
