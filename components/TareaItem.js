import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TareaItem({ tarea, cambiarEstadoTarea, eliminarTarea }) {
  return (
    <View style={estilos.tarea}>
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
  );
}

const estilos = StyleSheet.create({
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
});
