import { Button, Row } from "gsmk-web/components";
import { AppHeader } from "gsmk-web/ui";

import Logo from "../Logo";
import Navigation, { NavigationLink } from "../Navigation";
import SectionSelect from "../SectionSelect";

export default function Header() {
  return (
    <AppHeader
      heading={
        <Row cross="center" gap="small">
          <Logo />
          <SectionSelect section="operations" />

          <Navigation>
            <NavigationLink to="/operations/sensors">
              Sensors (WIP)
            </NavigationLink>
          </Navigation>
        </Row>
      }
      trailing={
        <Row>
          <Button
            flat
            onClick={() => {
              if (localStorage.getItem("theme") === "light") {
                localStorage.removeItem("theme");
                document.documentElement.classList.remove("light");
              } else {
                localStorage.setItem("theme", "light");
                document.documentElement.classList.add("light");
              }
            }}
          />
        </Row>
      }
    />
  );
}
