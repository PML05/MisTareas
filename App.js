import { useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [textoTarea, setTextoTarea] = useState('');
  const [tareas, setTareas] = useState([]);
  const [siguienteId, setSiguienteId] = useState(1);
  const [mostrarSecreto, setMostrarSecreto] = useState(false);
  const [filtro, setFiltro] = useState('Todas');

  const totalTareas = tareas.length;
  const tareasPendientes = tareas.filter((tarea) => tarea.completada === false).length;
  const tareasCompletadas = tareas.filter((tarea) => tarea.completada === true).length;

  const tareasVisibles = tareas.filter((tarea) => {
    if (filtro === 'Pendientes') {
      return tarea.completada === false;
    }

    if (filtro === 'Completadas') {
      return tarea.completada === true;
    }

    return true;
  });

  function agregarTarea() {
    const nombreTarea = textoTarea.trim();

    if (nombreTarea === '') {
      return;
    }

    if (nombreTarea === '123456') {
      setMostrarSecreto(true);
      setTextoTarea('');
      return;
    }

    const nuevaTarea = {
      id: siguienteId,
      nombre: nombreTarea,
      completada: false,
    };

    setTareas([...tareas, nuevaTarea]);
    setSiguienteId(siguienteId + 1);
    setTextoTarea('');
  }

  function cambiarEstadoTarea(id) {
    const tareasActualizadas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return {
          ...tarea,
          completada: !tarea.completada,
        };
      }

      return tarea;
    });

    setTareas(tareasActualizadas);
  }

  function eliminarTarea(id) {
    const tareasRestantes = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasRestantes);
  }

  return (
    <View style={estilos.pantalla}>
      <View style={estilos.encabezado}>
        <Text style={estilos.simbolo}>✓</Text>
        <Text style={estilos.titulo}>Mis Tareas</Text>
        <Text style={estilos.subtitulo}>Organizá tus actividades</Text>
      </View>

      <ScrollView
        style={estilos.zonaDesplazable}
        contentContainerStyle={estilos.contenedor}
        keyboardShouldPersistTaps="handled"
      >
        <View style={estilos.contenido}>
          <View style={estilos.formulario}>
            <TextInput
              style={estilos.entrada}
              placeholder="Escribí una tarea..."
              placeholderTextColor="#78889e"
              value={textoTarea}
              onChangeText={setTextoTarea}
            />

            <Pressable accessibilityRole="button" style={estilos.botonPrincipal} onPress={agregarTarea}>
              <Text style={estilos.textoPrincipal}>Agregar tarea</Text>
            </Pressable>
          </View>

          <View style={estilos.contadores}>
            <View style={[estilos.contador, estilos.total]}>
              <Text style={estilos.numero}>{totalTareas}</Text>
              <Text style={estilos.etiqueta}>Total</Text>
            </View>
            <View style={[estilos.contador, estilos.pendientes]}>
              <Text style={estilos.numero}>{tareasPendientes}</Text>
              <Text style={estilos.etiqueta}>Pendientes</Text>
            </View>
            <View style={[estilos.contador, estilos.completadas]}>
              <Text style={estilos.numero}>{tareasCompletadas}</Text>
              <Text style={estilos.etiqueta}>Completadas</Text>
            </View>
          </View>

          <View style={estilos.filtros}>
            {['Todas', 'Pendientes', 'Completadas'].map((opcion) => (
              <Pressable
                key={opcion}
                accessibilityRole="button"
                accessibilityState={{ selected: filtro === opcion }}
                style={[estilos.botonFiltro, filtro === opcion ? estilos.filtroSeleccionado : null]}
                onPress={() => setFiltro(opcion)}
              >
                <Text style={[estilos.textoFiltro, filtro === opcion ? estilos.textoSeleccionado : null]}>
                  {opcion}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={estilos.indicador}>Mostrando: {filtro}</Text>

          {mostrarSecreto && (
            <View style={estilos.secreto}>
              <Text style={estilos.simboloSecreto}>🎉</Text>
              <Text style={estilos.tituloSecreto}>¡Descubriste el secreto!</Text>
              <Text style={estilos.mensajeSecreto}>
                ¡Felicitaciones! Descubriste la función oculta de MisTareas.
              </Text>
              <Pressable
                accessibilityRole="button"
                style={estilos.botonPrincipal}
                onPress={() => setMostrarSecreto(false)}
              >
                <Text style={estilos.textoPrincipal}>Cerrar mensaje</Text>
              </Pressable>
            </View>
          )}

          {tareasVisibles.length === 0 ? (
            <Text style={estilos.mensaje}>
              {filtro === 'Todas'
                ? 'Todavía no hay tareas'
                : 'No hay tareas para este filtro'}
            </Text>
          ) : (
            tareasVisibles.map((tarea) => (
              <View key={tarea.id} style={estilos.tarea}>
                <Text
                  key={`${tarea.id}-${tarea.completada}`}
                  style={[
                    estilos.nombreTarea,
                    tarea.completada ? estilos.tareaCompletada : estilos.tareaPendiente,
                  ]}
                >
                  {tarea.nombre}
                </Text>

                <View style={estilos.botones}>
                  <Pressable
                    accessibilityRole="button"
                    style={estilos.botonSuave}
                    onPress={() => cambiarEstadoTarea(tarea.id)}
                  >
                    <Text style={estilos.textoSuave}>
                      {tarea.completada ? 'Pendiente' : 'Completar'}
                    </Text>
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    style={estilos.botonEliminar}
                    onPress={() => eliminarTarea(tarea.id)}
                  >
                    <Text style={estilos.textoEliminar}>Eliminar</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#f3f6fc',
  },
  zonaDesplazable: {
    flex: 1,
  },
  contenedor: {
    flexGrow: 1,
    paddingBottom: 48,
  },
  encabezado: {
    backgroundColor: '#2864ce',
    paddingTop: (StatusBar.currentHeight || 0) + 32,
    flexShrink: 0,
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    alignItems: 'center',
  },
  simbolo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#e1ecff',
    textAlign: 'center',
  },
  contenido: {
    padding: 16,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  formulario: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e1e8f3',
  },
  entrada: {
    backgroundColor: '#fff',
    color: '#243447',
    borderWidth: 1,
    borderColor: '#ccd8eb',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  botonPrincipal: {
    backgroundColor: '#2864ce',
    borderRadius: 12,
    minHeight: 48,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoPrincipal: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contadores: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  contador: {
    flexGrow: 1,
    flexBasis: 90,
    paddingVertical: 16,
    paddingHorizontal: 6,
    borderRadius: 16,
    alignItems: 'center',
  },
  total: {
    backgroundColor: '#dfebff',
  },
  pendientes: {
    backgroundColor: '#fff0c7',
  },
  completadas: {
    backgroundColor: '#dcf3e6',
  },
  numero: {
    color: '#243447',
    fontSize: 28,
    fontWeight: 'bold',
  },
  etiqueta: {
    color: '#42536b',
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  botonFiltro: {
    flexGrow: 1,
    flexBasis: 90,
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 12,
    backgroundColor: '#e5edfa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtroSeleccionado: {
    backgroundColor: '#2864ce',
  },
  textoFiltro: {
    color: '#244f91',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textoSeleccionado: {
    color: '#fff',
  },
  indicador: {
    color: '#63738b',
    fontSize: 13,
    marginTop: 16,
    marginBottom: 4,
  },
  mensaje: {
    marginTop: 16,
    padding: 20,
    fontSize: 16,
    color: '#63738b',
    textAlign: 'center',
  },
  tarea: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e1e8f3',
  },
  nombreTarea: {
    fontSize: 16,
    lineHeight: 24,
    color: '#243447',
    marginBottom: 10,
  },
  tareaCompletada: {
    textDecorationLine: 'line-through',
    color: '#63738b',
  },
  tareaPendiente: {
    textDecorationLine: 'none',
  },
  botones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  botonSuave: {
    backgroundColor: '#e0ecff',
    borderRadius: 10,
    minHeight: 44,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoSuave: {
    color: '#2459a6',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  botonEliminar: {
    backgroundColor: '#ffe7e7',
    borderRadius: 10,
    minHeight: 44,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoEliminar: {
    color: '#a93636',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  simboloSecreto: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 8,
  },
  tituloSecreto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2459a6',
    textAlign: 'center',
    marginBottom: 10,
  },
  mensajeSecreto: {
    fontSize: 16,
    lineHeight: 24,
    color: '#243447',
    textAlign: 'center',
    marginBottom: 16,
  },
  secreto: {
    backgroundColor: '#e4efff',
    borderWidth: 1,
    borderColor: '#c4d9fa',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
  },
});
