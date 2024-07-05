
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Rechange() {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Recargar Billetera</CardTitle>
                <CardDescription>Carga fondos a tu billetera a través de PayPal.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="amount">Monto a Recargar</Label>
                    <Input id="amount" type="number" placeholder="Ingresa el monto" />
                </div>
                <div className="grid gap-2">
                    <Label>Saldo Actual</Label>
                    <div className="text-2xl font-bold">$50.00</div>
                </div>
                <div />
            </CardContent>
            <CardFooter>
                <a href="/api/pay/update-amount" className="w-full">
                <Button className="w-full">
                    Recargar
                </Button>
                </a>
            </CardFooter>
        </Card>
    )
}