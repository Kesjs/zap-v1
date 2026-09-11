          <Link
            href="/"
            className="flex items-center flex-shrink-0 gap-2.5 transition-opacity hover:opacity-90"
            style={{ textDecoration: "none" }}
            aria-label="Accueil Reflet"
          >
            <div
              style={{
                position: "relative",
                width: "36px",
                height: "36px",
                borderRadius: "9px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Image
                src="/logo-mark.png"
                alt="Reflet"
                width={36}
                height={36}
                priority
                className="transition-transform duration-300"
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "17px",
                fontWeight: 700,
                color: "#39FF14",
                letterSpacing: "0.01em",
                lineHeight: 1,
              }}
            >
              Reflet
            </span>
          </Link>
