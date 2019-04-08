
export default function dearray(object)
{
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            object[key] = object[key][0];
        }
    }

    return object;
}
