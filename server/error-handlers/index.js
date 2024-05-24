function errorHandlers(app){
    app.use((req, res) => {
        res.status(404).json({ errorMessage: "ruta no encontrada" });
      });
      
      app.use((err, req, res, next) => {
        res.status(500).json({errorMessage: "problemas con el servidor inentelo más tarde"});
      });
  




}
module.exports=errorHandlers