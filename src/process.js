import actualizarContratos from "./functionTry.js";

process.on("message", (obj) => {
    actualizarContratos(obj.obj.starts, obj.obj.ends)
})