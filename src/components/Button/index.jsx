import { Container } from "./styles";

export function Button({title, loading = false, ...rest}) {
    return (
        <Container 
        type="button"
        disabled={loading}
        {...rest} // qualquer outra propriedade que não esteja explícita mas seja utilizada
        >
            {loading ? 'Carregando...' : title}
        </Container>
    )
}