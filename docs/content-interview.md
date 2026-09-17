# Content Interview — Catalonia Hotels & Resorts

## 0. Contexto

Aunque mi formación base es ciencias Químicas, me decidí a hacer un giro en mi carrera profesional, y estudié un Posgrado en Inteligencia de Negocio y Análisis de Datos en la Universitat Oberta de Catalunya (UOC). También realicé un Bootcamp full stack developer: Programa Formativo de Competencias tecnológicas en
Inteligencia Artificial & Machine Learning con Python (500 horas). Postgrado me formó especialmente en la parte de Data. El Bootcamp me formó especialmente en la parte de programación y desarrollo de aplicaciones. En este punto nunca había trabajado como Data/Developer, pero resultó que todo este mundo me resultaba muy interesante y me apasionaba, asi que ya tenia mucho ganado!

## 1. Cronología



### 1.1 Contratos

- Empecé a trabajar en Catalonia Hotels & Resorts en el 29 de enero de 2024, aunque realmente trabajaba para la consultora Hola Consultores. Catalonia Hotels & Resorts era la empresa cliente de Hola Consultores, y yo trabajaba en exlusiva para Catalonia Hotels & Resorts (por contrato con Hola Consultores). Me contrataron como Data Scientist, dentro del equipo de Business Intelligence. Al ser mi primer trabajo como Data/Developer, mi sueldo era muy bajo, pero era un buen punto de partida para mi carrera.
- El 03 de junio de 2025 (aprox), Catalonia Hotels & Resorts me hizo interno (o sea, ya no trabajaba para Hola Consultores, sino para Catalonia Hotels & Resorts). Igualmente como Data Scientist, dentro del equipo de Business Intelligence, aunque el rol ya había evolucionado como veremos más adelante. Mi sueldo aumentó considerablemente, casi el doble del que me pagaban en Hola Consultores.



### 1.2 CIOs

- Al entrar en Catalonia Hotels & Resorts, el CIO (Chief Information Officer) de la empresa era Marc Planas. En este punto, el departamento de IT (que englova BI, Web, SAP, HANA...), había crecido mucho en los ultimos años: desde el COVID-19, aprovecharon la "bajada de turismo" para mejorar la parte de IT (antes del COVID-19, el departamento de IT era muy pequeño, tenia lo minimo para lo operativa diaria). La mentalidad del departamento de IT, y la estrategia del CIO, eran de crecer, crear nuevos proyectos... Natural para esa fase en IT.
- A finales de 2025, hubo cambios en la dirección de la empresa (que es familiar), otra rama de la familia se hizo cargo de la empresa y hubo cambios con CEO y altos cargos ejecutivos en general. Al cabo de algun tiempo, estos cambios llegaron hasta el departamento de IT, y entró una nueva CIO: Yolanda Doñate. En este punto, el departamento IT ya era considerablemente más grande, y había que cambiar la mentalidad del departamento, y la estrategia del CIO. Prioridad mejorar calidad, reducir errores e incidencias, optimizar procesos, etc. El mayor cambio fue que en lugar de estar separados por areas (Web, BI, SAP, HANA...), ahora nos dividimos en proyectos por un lado, y mantenimiento por otro. La parte de Data no entró en esa división, y se consideró un area transversal. Pero sí hubo una cierta unbificación entre las diferentes partes de Data: BI pasó a ser Data, incluyendo la parte de HANA y ciertos roles tranversales.



### 1.3 Roles

- Desde el 29 de enero de 2024 hasta principios de 2026 (falta fecha exacta), yo trabajaba como Data Scientist, dentro del equipo de Business Intelligence.
- Con el cambio de CIO (principios de 2026), mi rol evolucionó y pasó a ser Integration Specialist, dentro del equipo de Data. Un rol un poco ambiguo. Realmente continuaba siendo un Data Specialist (igual que varios de mis compañeros), pero ahora mi trabajo era más transversal, y me encargaba de la integración de datos entre diferentes sistemas (SAP, HANA, etc.), especialmente con Fabric.
- Como veremos más adelante, la evolución de mi rol realmente fue más gradual, pero esas son las fechas clave y los roles oficiales.



## 2. Arquitectura inicial departamento IT + area de BI

Al entrar en la empresa, la arquitectura/flujo del dato era el siguiente:

- El principal origen del dato era SAP y sus diferentes modulos (TMS, MM...). SAP es el sistema transaccional de datos.
- Los datos de SAP pasaban a SAP BW (Business Warehouse) para ser procesados y transformados.
- Los datos de SAP BW se cargaban en datasets de Power BI, para posteriormente ser visualizados en reports y dashboards de Power BI.
- Los datos de SAP pasaban a SAP HANA Cloud para ser procesados y transformados, pero especialmente para hacer los datos mas accesibles. SAP HANA aun estaba en fase de desarrollo bastante inicial.
- La Web, asi como otros consumidores (ej. Emarsys para lanzar campañas de marketing, etc.) consumian los datos de SAP directamente (sus modulos internos) o de SAP HANA.



## 3. Etapas y proyectos



### 3.1 Etapa 1:

Este fase duró unos 12 meses aproximadamente, aunque de nuevo la evolución fue gradual. En esta fase, mi trabajo era principalmente el siguiente:

#### 3.1.1. Formación y setup

Aunque parezca obvio, lo primero fue formarme en la logica de negocio de la empresa. Los datos y tablas principales: reservas, ocupación, producciones, clientes, etc. Las reservas tienen varios estados, se pueden cancelar, tienen fecha de alta, fecha de check-in, fecha de check-out, fecha de llegada, fecha de salida, etc. También tenia que entender las diferentes plataformas de datos (SAP, HANA, Power BI, etc.) y como se integraban entre ellas. Y a partir de ahí, empezar a montar mi setup inicial y mi forma de trabajar. Mi posición era nueva en la empresa, por lo que empezaba de cero. Empecé usando el IDE de Visual Studio Code para desarrollar, y anaconda con sus notebooks para analizar los datos, hacer pruebas de concepto y crear modelos de machine learning.

#### 3.1.2. Experimentación

A partir de ahí, empecé a experimentar con diferentes modelos de machine learning, y diferentes enfoques para resolver los problemas. En concordancia con el enfoque del departamento IT en ese momento, empecé a experimentar con los pryectos que me propuesieron. Aun no teniamos plataforma, y era aun precario y a modo de prueba: no sistema de ingesta de datos, sino con csv o similar para probar.

##### 3.1.2.1. RoomTetris - Asignación de habitaciones

RoomTetris es un proyecto que se encarga de asignar habitaciones para optimizar la ocupación. Aunque no fue el proyecto principal, le dedicé bastante tiempo y esfuerzo. Con prespecitva, fue un proyecto un poco loco y demasiado ambicioso, aunque seguia un poco el espiritu de ese momento: crear algo nuevo, algo innovador... Un dia, el subCIO me envio un articulo de una empresa surgida a partir de un doctorado, que habian desarrollado un algoritmo de asignación de habitaciones para optimizar la ocupación, y me pidió que intentara desarrollar algo similar.

Cree la logica/algoritmo en Python, y la verdad que es funcionaba bastante bien, pero con el tiempo fue aumentando la complejidad. Para limitar el uso de recursos/computación tuve que aplicar "trucos" y "optimizaciones" para no analizar todas las combinaciones posibles por ejemplo. Asignar a diferentes tipos de habiationes, reservas de diferentes numeros de personas y de diferentes duraciones, fue factible, pero ir añadiendo variables complicaba las cosas: preferencias del cliente, rangos del cliente (programa loyalty), excepciones de clientes VIP, etc.

No es que no fuese viable, pero si habría que haberle dedicado mucho más tiempo y recursos. Además nos estabamos alejando de mi rol inicial/oficial, y quizas era más economico usar alguna solución comercial del mercado.

##### 3.1.2.2. Predicción de ocupación - Forecast de ocupación

Este si era el proyecto principal más relacionado con mi rol. En cierta forma, visto en prespectiva, también era un proyecto algo prematuro comparado con el nivel de madurez del departamento, pero era mucho más realista y factible. Se basaba en el uso de modelos de machine learning para predecir la ocupación de los hoteles a 30, 60 y 90 dias. Durante este periodo probé con multiples modelos, y diferentes enfoques:

- Modelos de machine learning: Random Forest, Gradient Boosting, XGBoost, LightGBM, CatBoost, etc.
- Modelos de deep learning / time series: LSTM, GRU, etc.
- Modelos de regresión: Linear Regression, Ridge Regression, Lasso Regression, etc.
- Modelos de time series: ARIMA, SARIMA, etc.

En general, los modelos de machine learning y deep learning/time series funcionaban bastante bien, y eran capaces de predecir la ocupación con una precisión bastante buena. Para mi sorpresa, los modelos de regresión eran los que mejor funcionaban, y eran capaces de predecir la ocupación con una precisión bastante buena, aunque requerian bastantes transformaciones de los datos, y un buen analisis previo de los datos y las variables a utilizar. La principal ventaja era utilizar las reservas ya realizadas a futuro como variable adelantada, por lo que no partiamos de cero.

El problema aqui no fue la precisión ni la viabilidad del forecast, sino que no existia una plataforma/sistema preparado para implementar el forecast, y luego poder consumirlo. Recuerda, aun estabamos trabajando con csv o similar. No teniamos una ingesta de datos automatizada.

##### 3.1.2.3. Clasificación de reservas - Cancel/No Cancel

Parecido al anterior, pero le dedicamos muchisimo menos tiempo. En este caso, se basaba en el uso de modelos de machine learning para clasificar las reservas a futuro en canceladas o no canceladas (se van a cancelar o no). Durante este periodo probé con multiples modelos, y diferentes enfoques:

- Modelos de machine learning: Random Forest, Gradient Boosting, XGBoost, LightGBM, CatBoost, etc.
- Modelos de deep learning: LSTM, GRU, etc.
- Modelos de regresión: Linear Regression, Ridge Regression, Lasso Regression, etc.

En este caso, los resultados no fueron tan buenos como los del forecast de ocupación, faltaban muchos datos a integrar al ser una clasificación a nivel de reserva, y no a nivel de hotel. Finalmente, no le dedicamos mucho tiempo debido al mismo motivo: no existia una plataforma/sistema preparado para implementar el forecast, y luego poder consumirlo. No teniamos una ingesta de datos automatizada. Nos estabamos "saltando pasos".

#### 3.1.3. Integración de datos

Estos proyectos se diferencian de los "experimentos" anteriores, en que son esencialmente practicos. Se centran en integrar datos y crear una base solida para luego poder explotarlos. No tanto en la creatividad y la innovación. Puede parecer más aburrido, pero es necesario para poder seguir avanzando, y lo que necesitabamos. En su mayor parte, en esta epoca fui "cedido" al equipo de HANA, pues dependiamos de eso para posteriores fases.

##### 3.1.3.1. SAP TMS a HANA - Python y API custom

Esta propueta se puede considerar a medio camino entre los "experimentos" anteriores y los proyectos practicos. Se trata de una integración de datos de SAP TMS a HANA, utilizando Python y una API custom. La idea era que los datos de SAP TMS se cargaran en HANA, para poder ser explotados desde alli. Fue simplemente una prueba de concepto. De nuevo, no parecia la mejor solución, espcialmente de cara mantenibilidad y escalabilidad.

##### 3.1.3.2. SAP TMS a HANA - FlowGrah y Procedures

La mejor solución que encontramos fue usar FlogGraph y Procedures para cargar los datos de SAP TMS a HANA. Esto nos permitio cargar los datos de SAP TMS a HANA de manera eficiente y escalable. Las cargas podian ser FULL (para maestros y cargas iniciales) o DELTA (para cargas posteriores). También se detectaban los borrados de origen, marcando el ultimo tipo de cambio de cada registro: 'I' (insert), 'U' (update) o 'D' (delete). El metodo que desarrollamos fue usando: vistas mirror del origen, tablas temporales y tablas replica. Las tablas temporales para cargar el dato incremental, luego comparar esos datos con los datos finales (tabla replica) materializados en HANA, y así detectar los cambios. Luego los procedures se encargaban de orquestar todos estos procesos.

Este proyecto fue claramente un exito, y nos permitió sincronizar muchos datos de SAP TMS a HANA de forma eficiente y escalable. Yo me ocupe de la parte de HANA, pero también colaboraron desde TMS para ir marcando los timestamps, crear las vistas mirror, etc.

##### 3.1.3.3. Detección y Notificación de Eventos - SAP BTP y APIs

Aprovechando la metodología de ingesta de datos en HANA, añadimos un paso al tener los datos en la vista temporal, para detectar eventos y guardarlos en una tabla de eventos en HANA. Al igual que comparabamos para detectar el tipo de cambio, ahora detectabamos otros eventos: creación de una reserva, cancelación de una reserva, dada de alta de un cliente, etc.

Adicionalmente, en BTP, creamos unas APIs que se activaban desde HANA. La App leía la tabla de eventos y otras auxiliares (subscriptores para enviar los eventos, etc.), y enviaba notificaciones a los subscriptores: colas de GCP y similares. También fue un claro exito, y con el tiempo se han ido añadiendo más eventos y subscriptores.

##### 3.1.3.4. Consumo de APIs desde PowerQuery - scripts en M

No fue un gran desarrollo, pero integramos datos de APIs de ReviewPro y Takhys desde PowerQuery para ser consumidos en Power BI. Se trataba de una solución temporal, ya que no era optima (muchas llamadas para guardar los datos en memoria), ya que no se materializaban los datos. A la larga se han migrado a Fabric.

### 3.2 Etapa 2:

Este fase duró entre 9 y 12 meses aproximadamente, aunque de nuevo la evolución fue gradual. En esta fase, mi trabajo era principalmente el siguiente:

#### 3.2.1. POCs

Realizamos 2 POCs con un doble objetivo:
- Escoger una consultora para desarrollar proyectos de data engineering y data science: forecast de ocupación, clasificación de reservas, etc.
- Escoger la mejor plataforma de datos para nuestros proyectos: a la larga migrar parte antigua de BI/BW, y crear nueva parte de analisis avaanzado.

Cada consultora representaba una plataforma diferente. Una por la parte de Google Cloud Platform (GCP), y otra por la parte de Microsoft Azure. Mi rol aqui fue de ir haciendo un seguimiento de ambos proyectos, resolver sus dudas...

En ambos casos desarrollaron un forecast de ocupación, que comparamos con el que había desarrollado en la etapa 1 (como punto de referencia). Ninguna de las dos fue mejor que la nuestra, pero ambas eran viables y factibles. En cualquier caso, nos gusto más la consultora de GCP, pero Fabric se ajustaba mejor a nuestras necesidades. Finalmente, escogimos la consultora Seidor, no por la consultora sino por la plataforma de datos que ofrecia: Fabric.

#### 3.2.2. Analisis, comparativa y elección de plataforma

A partir de los resultados de los POCs, realizamos una comparativa de las diferentes plataformas, y escogimos Fabric. Fabric se ajustaba mejor a nuestras necesidades, y era la mejor opción para nuestro entorno. Adicionalmente, yo ya llevaba tiempo investigando varias alternativas, principalmente Google Cloud Platform (GCP), Databricks y Fabric.

#### 3.2.3. Desarrollo de Fabric

En este punto, iniciamos el desarrollo de Fabric, en colaboración con la consultora Seidor. Pero en este punto fue un proyecto más de data engineering, no tanto de data science. En realidad tenia sentido, ya que aun necesitabamos la base para luego poder construir encima.

La principal contribución de Seidor fue crear un sistema de ingesta de datos desde SAP HANA (y en parte desde SAP BW), más o menos automatizado (configurable desde un excel de configuración). Pero en la parte de ETL fue bastante desastroso, ya que no tenian conocimiento de negocio ni de los datos en sí de la empresa.

Mi tarea era doble:

- Hacer el seguimiento de su proyecto, y resolver sus dudas.
- Desarrollar gran parte de la platoforma (Seidor fue una pequeña ayuda, pero yo desarrolle gran parte de la plataforma).

La arquitectura en Fabric fue medalion: BRONZE, SILVER y GOLD, cada capa con su propio Lakehouse, a su vez dividido en esquemas (schemas) y tablas (tables). Esto formaba un Workspace, y teniamos 3 Workspaces: DEV, QA y PRO.

Casi todos los desarrollos fueron en Pyspark (o Python en menor medida), y con T-SQL para queries, validaciones, etc.

#### 3.2.4. Integraciones extras APIs: ReviewPro y Takhys

Al disponer de Fabric, fui creando integraciones extras con APIs de ReviewPro y Takhys para poder consumir los datos de esas plataformas y poder integrarlos en Fabric. Cargas diarias/semanales/mensuales de datos, que luego usabamos en los informes y dashboards de Power BI. La gran ventaja es que podiamos guardar el historico completo, limpiar datos, etc.

### 3.3 Etapa 3:

Este fase duró entre 6 y 9 meses aproximadamente, aunque de nuevo la evolución fue gradual. Es la ultima fase / fase acutal. En esta fase, mi trabajo era principalmente el siguiente:

#### 3.3.1. Data Engineering

En este punto, Seidor nos habia ayudado, pero aun había mucho por hacer en la plataforma, asi que yo me encargue de la mayor parte del desarrollo restante. Aqui ya casi habiamos abandonado el objetivo de forecast/ML/data science, y nos centramos en la parte de data engineering, principalmente en migrar los datos de SAP BW a Fabric para disponer de una base solida de datos, para luego poder explotarlos.

Aqui englovamos muchos trabajo. Terminar lo que Seidor habia empezado, migrar datos de SAP BW a Fabric (desde SAP HANA estaba más avanzado), crear nuevos modelos de datos para nuevos informes (por ejemplo, analisis de emails, RFM/Customer Lifetime Value/Customer 360, Rewards, etc.).

Muchas expectativas a futuro con Fabric, pero solo yo desarrollando activamente. Las colaboraciones de consultoras ayudan, pero son muy poco eficaces y requieren mucho de nuestro tiempo y esfuerzo.

Como extra, también lleve un proyecto con otra consultora (Deloitte), para integrar datos de Emarsys y GCP relacionados con marketing y campañas de marketing (emails, clicks, opens, etc.).

#### 3.3.2. Data Gobernance y IA/Cursor

Con la nueva filosofía de departamento IT y la nueva CIO, empecé a crear un sistema de gobernanza de datos para Fabric: Fabric había crecido considerablemente con 200+ tablas, 200+ notebooks, 30+ pipelines... Y estaba sin gobernanza ni control de calidad.

Empecé a crear un nuevo repo de git (DevOps de Azure): 3 ramas, una por cada Workspace (DEV, QA y PRO). También cree otro repo para la parte de Gobernance (GOVERNANCE-BI) como documentación tratado como codigo.

GOVERNANCE-BI — resumen

GOVERNANCE-BI es una plataforma de gobierno para gestionar de forma trazable, controlada y reproducible el ciclo de cambios de Fabric Dev → QA → Pro.

La pieza central es la Release Entry, que registra qué cambio se realiza, qué assets afecta y qué documentación está relacionada. A partir de ella se articula todo el ciclo:

- Developer → crea la entry, actualiza la documentación de los assets afectados y prepara el cambio para revisión.
- Reviewer → genera y revisa las evidencias, comprueba las Rules y decide qué entries se aprueban para promoción, dejando el motivo.
- Releaser → ejecuta el pase en Fabric y cierra la release actualizando estados, changelog, notes e inventario.
- Maintainer → mantiene y mejora la plataforma de gobierno.

Alrededor de las entries existen varias capas:

- Rules & Evidence: controles automáticos sobre los assets, con severidad blocker / warning.
- Approvals: acta formal de las decisiones de promoción.
- CHANGELOG & Release Notes: trazabilidad del estado y de lo que finalmente se promocionó.
- Inventario Fabric: qué assets y tablas existen realmente en Pro y cuánto están documentados.
- Modelo de Datos / Pipelines / Libs: documentación funcional de los assets.
- Confluence: superficie de publicación para que la información de gobierno sea accesible fuera de Git.

La filosofía es deliberadamente human-in-the-loop: el sistema automatiza generación, validaciones, evidencias y preparación de decisiones, pero no decide ni ejecuta promociones automáticamente.

El objetivo de la V1 no es tener una plataforma enorme, sino demostrar que el proceso funciona en la práctica, que no puede dar falsa sensación de seguridad, y que finalmente otra persona puede ejecutar los roles sin depender del conocimiento del creador.

La IA y Gobernance se complementan y retroalimentan. La IA ayuda a generar documentación, y la documentación ayuda a la IA a generar mejor codigo. Se trata de profesionalizar la plataforma.