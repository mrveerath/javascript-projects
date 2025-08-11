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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var api_key = 'J0wqZ7RIoc0RlUiQks4VAPC4aFvKh4ZJRyUNaZPhhxc13Wb9NyGlPSfk';
function fetchRandomPexelsImages(query_1) {
    return __awaiter(this, arguments, void 0, function (query, totalImages) {
        var API_KEY, perPage, totalPages, images, i, url, response, data, photos, error_1;
        if (totalImages === void 0) { totalImages = 100; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    API_KEY = 'J0wqZ7RIoc0RlUiQks4VAPC4aFvKh4ZJRyUNaZPhhxc13Wb9NyGlPSfk';
                    perPage = 80;
                    totalPages = Math.ceil(totalImages / perPage);
                    images = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    i = 1;
                    _a.label = 2;
                case 2:
                    if (!(i <= totalPages)) return [3 /*break*/, 6];
                    url = "https://api.pexels.com/v1/search?query=".concat(encodeURIComponent(query), "&per_page=").concat(perPage, "&page=").concat(i);
                    return [4 /*yield*/, fetch(url, {
                            headers: {
                                Authorization: API_KEY
                            }
                        })];
                case 3:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Error: ".concat(response.status, " ").concat(response.statusText));
                    }
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    photos = data.photos.map(function (photo) { return ({
                        id: photo.id,
                        photographer: photo.photographer,
                        url: photo.src.medium
                    }); });
                    images = __spreadArray(__spreadArray([], images, true), photos, true);
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 2];
                case 6: 
                // Shuffle images randomly
                return [2 /*return*/, images.sort(function () { return Math.random() - 0.5; }).slice(0, totalImages)];
                case 7:
                    error_1 = _a.sent();
                    console.error('Failed to fetch images:', error_1);
                    return [2 /*return*/, []];
                case 8: return [2 /*return*/];
            }
        });
    });
}
var imageGallery = document.querySelector('.images-container');
// Example usage:
imageGallery.innerHTML = '';
fetchRandomPexelsImages('random', 100).then(function (images) { return images.forEach(function (image) {
    var masonaryItem = document.createElement('div');
    masonaryItem.classList.add('masonary-item');
    var imageElement = document.createElement('img');
    imageElement.src = image.url;
    masonaryItem.appendChild(imageElement);
    imageGallery.appendChild(masonaryItem);
}); });
