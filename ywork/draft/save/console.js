if (window.console){

      console.log("Ejemplo de mensaje o log predeterminado");
      console.error("Ejemplo de mensaje de error");
      console.warn("Ejemplo de mensaje de advertencia");
      console.info("Ejemplo de mensaje de información");

      console.log("%cMensaje de color verde y grande", "color: green; font-size: x-large");

      let sitiosweb = [
        {Nombre: "NorfiPC",
          Autor: "Norfi Carrodeguas",
          Enlace: "https://norfipc.com"},
        {Nombre: "Otro sitio",
          Autor: "Pedro Perez",
          Enlace: "https://pedroperez.com"},
        {Nombre: "Tercer sitio",
          Autor: "Juan Lopez",
          Enlace: "https://juanlopez.com"}
      ];

      const label = 'Adolescent Irradiated Espionage Tortoises';
      console.group(label);
      console.info('Leo');
      console.info('Mike');
      console.info('Don');
      console.info('Raph');
      console.groupEnd(label);

      console.table(sitiosweb); //incluye Array(3)

      console.log(sitiosweb[0].Nombre);

      alert();

      console.clear();

}
