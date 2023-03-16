import { Container } from "./styles";

// icon: Icon => regra que um componente começa com letra maiúscula
export function Input({icon: Icon, ...rest}) {
    return (
        // só mostra o ícone se ele existir
        <Container>
            {Icon && <Icon size={20}/>} 
            <input {...rest}/>
        </Container>
    )
}