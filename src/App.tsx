import { Dialog ,DialogTrigger ,DialogContent ,DialogTitle ,DialogHeader ,DialogFooter } from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {Button} from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select"
import { useRef, useState } from "react";

import { toast } from "sonner";
import { Tren } from "./clases/Tren";
function App() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openInsertAfter, setOpenInsertAfter] = useState(false);
  const [texto, setTexto] = useState("");
  const [color, setColor] = useState("azul");
  const [valorEliminar, setValorEliminar] = useState("");
  const [valorReferencia, setValorReferencia] = useState("");
  const [nuevoTexto, setNuevoTexto] = useState("");
  const [nuevoColor, setNuevoColor] = useState("azul");
  const [vagones, setVagones] = useState<Array<{valor: string, color: string}>>([]);
  
  // Creamos una instancia de Tren que persista entre renders
  const trenRef = useRef(new Tren<string>());
  
  const handleAgregar = () => {
    if (!texto.trim()) {
      toast.error("El texto del vagón no puede estar vacío");
      return;
    }
    
    trenRef.current.agregar(texto, color);
    setVagones(trenRef.current.obtenerVagones());
    setTexto("");
    setOpen(false);
  };
  
  const handleEliminar = () => {
    if (!valorEliminar.trim()) {
      toast.error("Debes ingresar un valor para eliminar");
      return;
    }
    
    const resultado = trenRef.current.eliminar(valorEliminar);
    if (resultado) {
      setVagones(trenRef.current.obtenerVagones());
      toast.success(`Se eliminó el vagón con valor "${valorEliminar}"`);
    } else {
      toast.error( `No se encontró ningún vagón con valor "${valorEliminar}"`);
    }
    
    setValorEliminar("");
    setOpenDelete(false);
  };

  const handleEliminarUltimo = () => {
    const resultado = trenRef.current.eliminarUltimo();
    if (resultado) {
      setVagones(trenRef.current.obtenerVagones());
      toast.success("Se eliminó el último vagón del tren");
    } else {
      toast.error("No hay vagones para eliminar");
    }
  };

  const handleAgregarDespuesDe = () => {
    if (!valorReferencia.trim() || !nuevoTexto.trim()) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    
    const resultado = trenRef.current.agregarDespuesDe(valorReferencia, nuevoTexto, nuevoColor);
    if (resultado) {
      setVagones(trenRef.current.obtenerVagones());
      toast.success(`Se agregó el vagón después de "${valorReferencia}"`);
    } else {
      toast.error(`No se encontró el vagón de referencia "${valorReferencia}"`);
    }
    
    setValorReferencia("");
    setNuevoTexto("");
    setOpenInsertAfter(false);
  };
  
  const getVagonImage = (color: string) => {
    switch (color) {
      case "azul":
        return "/images/vagon-azul.jpg";
      case "verde":
        return "/images/vagon-verde.jpg";
      case "amarillo":
        return "/images/vagon-amarillo.jpg";
      default:
        return "/images/vagon-azul.jpg";
    }
  };

  return (
    <div className="w-full min-h-screen text-primary container p-10">
      <h1 className="text-center text-5xl uppercase font-bold mb-8">Listas enlazadas simples</h1>
      
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Agregar Vagón</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar nuevo vagón</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="texto" className="text-right">
                  Texto
                </Label>
                <Input 
                  id="texto" 
                  value={texto} 
                  onChange={(e) => setTexto(e.target.value)} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">
                  Color
                </Label>
                <Select value={color} onValueChange={setColor}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecciona un color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="azul">Azul</SelectItem>
                    <SelectItem value="verde">Verde</SelectItem>
                    <SelectItem value="amarillo">Amarillo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAgregar}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogTrigger asChild>
            <Button variant="destructive">Eliminar Vagón</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Eliminar vagón</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="valorEliminar" className="text-right">
                  Texto del vagón
                </Label>
                <Input 
                  id="valorEliminar" 
                  value={valorEliminar} 
                  onChange={(e) => setValorEliminar(e.target.value)} 
                  className="col-span-3" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="destructive" type="submit" onClick={handleEliminar}>Eliminar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button variant="destructive" onClick={handleEliminarUltimo}>
          Eliminar Último Vagón
        </Button>
        
        <Dialog open={openInsertAfter} onOpenChange={setOpenInsertAfter}>
          <DialogTrigger asChild>
            <Button variant="outline">Insertar Después De</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insertar vagón después de</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="valorReferencia" className="text-right">
                  Texto del vagón de referencia
                </Label>
                <Input 
                  id="valorReferencia" 
                  value={valorReferencia} 
                  onChange={(e) => setValorReferencia(e.target.value)} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nuevoTexto" className="text-right">
                  Texto del nuevo vagón
                </Label>
                <Input 
                  id="nuevoTexto" 
                  value={nuevoTexto} 
                  onChange={(e) => setNuevoTexto(e.target.value)} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nuevoColor" className="text-right">
                  Color
                </Label>
                <Select value={nuevoColor} onValueChange={setNuevoColor}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecciona un color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="azul">Azul</SelectItem>
                    <SelectItem value="verde">Verde</SelectItem>
                    <SelectItem value="amarillo">Amarillo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAgregarDespuesDe}>Insertar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="w-full relative flex items-center overflow-x-auto py-4">
        <img src="/images/locomotora.jpg" alt="locomotora" className="w-64 h-64 object-contain flex-shrink-0" />
        
        {vagones.map((vagon, index) => (
          <div key={index} className="flex flex-col mb-5 items-center flex-shrink-0">
            <div className="text-center absolute top-0 font-bold h-10 flex items-center justify-center">
              {vagon.valor}
            </div>
            <img 
              src={getVagonImage(vagon.color)} 
              alt={`vagón ${vagon.color}`} 
              className="w-64 h-64 object-contain" 
            />
            {index < vagones.length - 1 && (
              <div className="w-8 h-2 bg-gray-700 mx-2"></div>
            )}
          </div>
        ))}
      </div>
      
      {vagones.length === 0 && (
        <div className="text-center mt-8 text-gray-500">
          No hay vagones aún. ¡Agrega algunos para comenzar!
        </div>
      )}
    </div>
  );
}

export default App;