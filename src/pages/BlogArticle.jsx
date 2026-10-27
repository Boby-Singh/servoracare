
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

const SITE_URL = "https://www.servoracare.in";
const BLOG_URL = `${SITE_URL}/blog`;
const AUTHOR = "ServoraCare Editorial Team";

// Keep these slugs consistent with Blog.jsx.
// All article content is managed in this single data source.
const blogPosts = [
  {
    id: 1,
    title: "10 Electrical Safety Tips Every Homeowner Should Know",
    slug: "10-electrical-safety-tips-every-homeowner-should-know",
    category: "Electrical",
    excerpt:
      "Learn practical electrical safety precautions, warning signs and maintenance habits that can help protect your home.",
    date: "2026-09-24",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "Why electrical safety matters",
        paragraphs: [
          "Electricity powers lighting, appliances and everyday equipment in our homes. Damaged wiring, unsuitable connections and neglected electrical faults can create risks including electric shock and fire.",
          "Regular visual checks can help identify warning signs. Electrical installation, testing and repairs should be handled by an appropriately qualified professional."
        ]
      },
      {
        heading: "1. Avoid overloading sockets",
        paragraphs: [
          "Connecting several high-power appliances to one socket or extension board can overload the circuit. Follow equipment ratings and avoid connecting multiple extension boards together.",
          "If a plug, socket or extension board becomes unusually hot, stop using it and arrange a professional inspection."
        ]
      },
      {
        heading: "2. Never ignore damaged wires",
        paragraphs: [
          "Frayed cables, cracked plugs, exposed conductors and damaged insulation should not be treated as minor cosmetic problems. Stop using the affected equipment and keep people away from exposed wiring.",
          "Do not attempt to repair damaged mains cables with ordinary tape. Replace the equipment or have it repaired appropriately."
        ]
      },
      {
        heading: "3. Keep electricity away from water",
        paragraphs: [
          "Wet hands, damp floors and water near electrical equipment increase the risk of electric shock. Keep appliances and connections away from sinks, bathrooms and other wet areas unless they are designed and installed for those conditions.",
          "Never touch electrical equipment if you are standing in water or suspect that it has become wet."
        ]
      },
      {
        heading: "4. Pay attention to repeated breaker trips",
        paragraphs: [
          "A circuit breaker that trips repeatedly may indicate an overloaded circuit, a fault in an appliance or a wiring problem. Do not repeatedly reset it without finding the cause.",
          "Have a qualified electrician investigate recurring trips instead of replacing the breaker with a higher-rated device."
        ]
      },
      {
        heading: "5. Use properly rated electrical equipment",
        paragraphs: [
          "Choose plugs, extension boards and electrical accessories that are suitable for the appliance load and intended environment. Avoid counterfeit or visibly damaged electrical products.",
          "Do not remove safety features or modify plugs to force an incompatible connection."
        ]
      },
      {
        heading: "6. Keep electrical panels accessible",
        paragraphs: [
          "Keep distribution boards and circuit breakers accessible and free from stored items. Labels identifying circuits can help a qualified professional or household member identify the appropriate circuit in an emergency.",
          "Do not remove panel covers or touch internal components unless you are qualified and following the appropriate safety procedures."
        ]
      },
      {
        heading: "7. Use appropriate protection devices",
        paragraphs: [
          "Properly selected circuit breakers, earthing and residual-current protection devices can reduce specific electrical risks when correctly installed and maintained.",
          "Protection requirements depend on the installation. Ask a qualified electrician to assess your home rather than assuming that one device replaces all other safety measures."
        ]
      },
      {
        heading: "8. Keep appliances in good condition",
        paragraphs: [
          "Inspect appliance cords, plugs and housings for visible damage. Follow manufacturer instructions for cleaning, ventilation and maintenance.",
          "If an appliance produces smoke, sparks, a burning smell or an electric shock sensation, stop using it. Disconnect power only if you can do so safely."
        ]
      },
      {
        heading: "9. Arrange inspections when needed",
        paragraphs: [
          "Older properties, renovation projects, recurring electrical faults and new high-power appliances may justify a professional assessment of the electrical installation.",
          "Ask about wiring condition, earthing, circuit loading and protective devices relevant to your home."
        ]
      },
      {
        heading: "10. Leave major electrical work to professionals",
        paragraphs: [
          "Do not attempt live electrical work, mains rewiring or internal distribution-board repairs as a DIY project. A mistake can cause serious injury even when the power appears to be off.",
          "Use an appropriately qualified electrician for installation, troubleshooting and repairs."
        ]
      },
      {
        heading: "When should you seek urgent help?",
        paragraphs: [
          "Smoke, flames, sparking equipment or a strong burning smell require immediate attention. Keep away from the affected equipment and contact emergency services if there is a fire or immediate danger.",
          "Never touch a person who may still be in contact with a live electrical source. Do not approach or handle exposed live wiring."
        ]
      },
      {
        heading: "Electrical safety checklist",
        paragraphs: [
          "Check for damaged cables, hot sockets, unusual smells and repeated breaker trips. Keep electrical equipment away from water, avoid overloaded extension boards and arrange professional help when warning signs appear.",
          "These visual checks do not replace a professional inspection of your electrical installation."
        ]
      }
    ]
  },

  {
    id: 2,
    title: "How to Know When Your AC Needs Professional Repair",
    slug: "how-to-know-when-your-ac-needs-professional-repair",
    category: "AC Repair",
    excerpt:
      "Understand common air-conditioner warning signs, basic checks and when to arrange professional servicing.",
    date: "2026-09-21",
    image:
      "https://images.unsplash.com/photo-1631545806609-4b4d7f7d1c86?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "Why early AC diagnosis matters",
        paragraphs: [
          "An air conditioner may show signs of a problem before it stops cooling completely. Recognising changes in airflow, temperature, sound or water drainage can help you arrange maintenance before the issue becomes more disruptive.",
          "Not every cooling problem means a major repair is required. Start with the safe checks recommended by the manufacturer."
        ]
      },
      {
        heading: "1. The AC is not cooling properly",
        paragraphs: [
          "If the room remains warm despite the air conditioner running, check the thermostat setting, operating mode and whether doors or windows are allowing hot air inside.",
          "If cooling remains poor, a technician may need to inspect the filters, airflow, refrigerant circuit and other system components. Refrigerant work should be left to trained professionals."
        ]
      },
      {
        heading: "2. Airflow is weaker than usual",
        paragraphs: [
          "Weak airflow can result from a dirty filter, blocked air inlet, obstructed outlet or an internal fault. Follow the user manual when checking or cleaning a removable filter.",
          "If airflow does not improve after basic maintenance, arrange a professional inspection rather than dismantling the unit."
        ]
      },
      {
        heading: "3. Strange noises appear",
        paragraphs: [
          "Rattling, grinding, repeated clicking or unusual buzzing may indicate a loose part, fan problem or electrical issue. Note when the noise occurs and whether the unit still operates normally.",
          "Switch the system off if you hear severe grinding, notice smoke or smell burning, and seek qualified help."
        ]
      },
      {
        heading: "4. Water leaks from the indoor unit",
        paragraphs: [
          "Water dripping indoors may be associated with a blocked drain, drainage installation problem or another fault. Persistent leakage can damage walls, ceilings and nearby electrical equipment.",
          "Turn the unit off if water is approaching electrical components. Have a technician investigate the cause before resuming use."
        ]
      },
      {
        heading: "5. Unusual smells or frequent shutdowns",
        paragraphs: [
          "Persistent musty smells may indicate moisture or contamination requiring attention. Burning smells or smoke are more urgent warning signs.",
          "Repeated shutdowns may be caused by a number of issues, including restricted airflow or electrical faults. Do not repeatedly restart a system that keeps stopping unexpectedly."
        ]
      },
      {
        heading: "Safe maintenance you can do",
        paragraphs: [
          "Keep the outdoor unit's surroundings clear of obstructions, clean accessible filters as directed by the manufacturer and make sure the indoor air outlet is unobstructed.",
          "Do not open electrical compartments, handle refrigerant lines or attempt electrical repairs yourself."
        ]
      },
      {
        heading: "When should you book a technician?",
        paragraphs: [
          "Arrange professional service when cooling remains weak, leakage persists, abnormal noises continue or the system repeatedly shuts down. Describe the symptoms, their duration and any recent changes.",
          "Before booking, confirm the service scope, visit arrangements and applicable charges."
        ]
      },
      {
        heading: "Frequently asked questions",
        paragraphs: [
          "How often should filters be cleaned? Follow the manufacturer's instructions and adjust the frequency according to usage, dust and indoor conditions.",
          "Should refrigerant be added every year? Not automatically. A system that needs repeated refrigerant charging may have a leak or another issue that requires diagnosis."
        ]
      }
    ]
  },

  {
    id: 3,
    title: "5 Common Plumbing Problems and How to Prevent Them",
    slug: "5-common-plumbing-problems-and-how-to-prevent-them",
    category: "Plumbing",
    excerpt:
      "Learn to recognise leaking taps, slow drains, low water pressure and other common plumbing issues.",
    date: "2026-09-18",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "Why routine plumbing checks matter",
        paragraphs: [
          "Small plumbing problems can waste water and damage cupboards, flooring or walls if they remain unnoticed. A quick visual check of accessible pipes, taps and drainage points can help you identify changes early.",
          "Avoid dismantling pressurised fittings or using harsh chemical drain cleaners without understanding their risks."
        ]
      },
      {
        heading: "1. Leaking taps and fixtures",
        paragraphs: [
          "A tap that continues dripping after it is fully closed may have a worn seal, cartridge or other damaged component. Persistent leaks waste water and can become more noticeable over time.",
          "If you are not familiar with the fixture, ask a plumber to identify the correct replacement part and repair it."
        ]
      },
      {
        heading: "2. Slow or blocked drains",
        paragraphs: [
          "Hair, grease, food particles and other debris can accumulate in drainage systems. Use suitable drain strainers and avoid pouring cooking oil or grease into sinks.",
          "If a drain repeatedly blocks, several fixtures back up together or wastewater returns into the home, arrange professional assessment. Avoid mixing drain-cleaning chemicals."
        ]
      },
      {
        heading: "3. Low water pressure",
        paragraphs: [
          "Low pressure may affect one tap or several fixtures. Check whether the issue is limited to a single outlet and whether other household members have noticed it.",
          "Possible causes include a clogged aerator, a supply problem, a faulty valve or pipework issues. A plumber can investigate persistent or widespread pressure changes."
        ]
      },
      {
        heading: "4. Leaks under sinks",
        paragraphs: [
          "Check accessible areas beneath sinks for moisture, damaged cabinet surfaces or water marks. Connections, traps and supply hoses can leak as they age.",
          "If a leak is active, stop using the affected fixture and close its isolation valve if you can safely identify and operate it. If water is near electrical equipment, stay clear and seek appropriate help."
        ]
      },
      {
        heading: "5. Running or overflowing toilets",
        paragraphs: [
          "A toilet that continues running after flushing may have a faulty fill valve, flush mechanism or seal. An overflowing toilet can cause substantial water damage.",
          "If the toilet is overflowing, stop further flushing and shut off its supply valve if safe. Contact a plumber if the problem persists or the source is unclear."
        ]
      },
      {
        heading: "Simple plumbing maintenance checklist",
        paragraphs: [
          "Look for visible drips, damp cupboards, loose taps, slow drains and unexpected changes in water pressure. Keep accessible drain strainers clean and avoid disposing of unsuitable waste in sinks.",
          "Do not ignore unexplained damp patches or a sudden increase in water use. Hidden leaks may require professional detection."
        ]
      },
      {
        heading: "When should you call a plumber?",
        paragraphs: [
          "Seek professional help for recurring blockages, persistent leaks, sewage backup, unexplained pressure changes or repairs involving concealed pipes. Shut off the water supply if a leak is causing damage and it is safe to do so.",
          "When booking a service, explain where the problem occurs, when it started and whether it is getting worse."
        ]
      }
    ]
  },

  {
    id: 4,
    title: "How Often Should You Deep Clean Your Home?",
    slug: "how-often-should-you-deep-clean-your-home",
    category: "Cleaning",
    excerpt:
      "Build a realistic deep-cleaning schedule for kitchens, bathrooms, bedrooms and shared spaces.",
    date: "2026-09-15",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "What is deep cleaning?",
        paragraphs: [
          "Regular cleaning usually focuses on visible dirt and frequently used surfaces. Deep cleaning involves more detailed work, such as cleaning neglected corners, reaching accessible areas behind furniture and removing accumulated grime.",
          "The right schedule depends on the number of occupants, pets, allergies, cooking habits and how heavily each room is used."
        ]
      },
      {
        heading: "Kitchen cleaning schedule",
        paragraphs: [
          "Wipe food preparation surfaces after use and clean spills promptly. Clean frequently touched handles and wash dishes regularly to reduce the accumulation of food residue.",
          "Every few weeks, inspect accessible appliance surfaces, cupboard fronts, exhaust filters where user maintenance is permitted and areas where grease accumulates. Follow the appliance manufacturer's cleaning instructions."
        ]
      },
      {
        heading: "Bathroom cleaning schedule",
        paragraphs: [
          "Clean sinks, toilets and frequently touched bathroom surfaces regularly. Remove visible soap residue and dry persistently damp areas when practical.",
          "Inspect accessible sealant and grout for deterioration. Persistent moisture, mould or recurring damp patches may require investigation rather than surface cleaning alone."
        ]
      },
      {
        heading: "Bedroom and living-area cleaning",
        paragraphs: [
          "Wash bedding regularly according to fabric-care instructions. Dust accessible surfaces, vacuum floors and clean high-touch items as part of a routine schedule.",
          "Every few weeks, move lightweight furniture when safe, clean reachable corners and inspect areas that are usually hidden from view."
        ]
      },
      {
        heading: "A practical seasonal checklist",
        paragraphs: [
          "Every season, review curtains, fans, accessible vents, storage areas and windows. Check whether household maintenance tasks have been overlooked and adjust the schedule to your home's needs.",
          "Do not climb unstable furniture to reach high areas. Use suitable equipment or arrange help for difficult or hazardous tasks."
        ]
      },
      {
        heading: "Choose cleaning products safely",
        paragraphs: [
          "Read product labels, ventilate rooms as instructed and use protective equipment when required. Never mix bleach with ammonia, acids or other cleaning products because dangerous gases can form.",
          "Test a cleaning product on a small, inconspicuous area when the surface or finish may be sensitive."
        ]
      },
      {
        heading: "When is professional deep cleaning useful?",
        paragraphs: [
          "Professional cleaning may be helpful before moving into a property, after renovation, before a special event or when detailed cleaning is difficult to complete yourself.",
          "Before booking, confirm which rooms, surfaces and tasks are included. Ask whether specialised equipment or additional charges apply."
        ]
      }
    ]
  },

  {
    id: 5,
    title: "CCTV Installation: What Homeowners Should Know",
    slug: "cctv-installation-what-homeowners-should-know",
    category: "CCTV & Security",
    excerpt:
      "Understand camera placement, recording options, privacy and the questions to ask before installing CCTV.",
    date: "2026-09-11",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "Start with a clear security goal",
        paragraphs: [
          "Before purchasing cameras, identify the areas you want to monitor, such as an entrance, driveway or common access point. A clear objective helps determine the number and type of cameras required.",
          "Avoid buying equipment based only on resolution or advertised features. Reliability, placement, storage and ongoing maintenance also matter."
        ]
      },
      {
        heading: "Choose the right camera location",
        paragraphs: [
          "Entrances and other relevant access points may benefit from camera coverage. Consider lighting, weather exposure, viewing angles and possible obstructions.",
          "Avoid positioning cameras where the image is dominated by glare or where everyday activity routinely blocks the view."
        ]
      },
      {
        heading: "Wired or wireless systems?",
        paragraphs: [
          "Wired cameras can provide a stable connection but may require cable routing and installation work. Wireless cameras can be easier to position, although performance depends on network coverage and power arrangements.",
          "Ask the installer about power backup, network reliability, recording continuity and what happens if internet access is interrupted."
        ]
      },
      {
        heading: "Understand storage and remote access",
        paragraphs: [
          "Some systems record locally, while others use cloud storage or a combination. Storage capacity, recording resolution and the number of cameras affect how long footage can be retained.",
          "Use strong, unique passwords, enable multi-factor authentication where available and install manufacturer security updates."
        ]
      },
      {
        heading: "Respect privacy and legal obligations",
        paragraphs: [
          "Position cameras to focus on your property and avoid unnecessary capture of neighbours' private spaces. Inform household members, staff or visitors where appropriate.",
          "Check applicable privacy and legal requirements before recording or sharing footage. Access should be limited to people who genuinely need it."
        ]
      },
      {
        heading: "Questions to ask your installer",
        paragraphs: [
          "Ask about camera coverage, night performance, storage duration, mobile access, warranty, installation scope and maintenance. Confirm who will have access to the system and how administrator credentials will be handed over.",
          "Request a demonstration of live viewing, playback and exporting footage before accepting the installation."
        ]
      },
      {
        heading: "CCTV maintenance checklist",
        paragraphs: [
          "Periodically check the camera view, clean external lenses using appropriate materials, verify the recording status and confirm that date and time settings are correct.",
          "Review access permissions when household members or service providers no longer need access. Replace default credentials and keep software updated."
        ]
      }
    ]
  },

  {
    id: 6,
    title: "Simple Home Maintenance Checklist for Every Season",
    slug: "simple-home-maintenance-checklist-for-every-season",
    category: "Home Maintenance",
    excerpt:
      "Use a seasonal checklist to spot maintenance issues, reduce avoidable damage and keep your home comfortable.",
    date: "2026-09-07",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "Why seasonal maintenance helps",
        paragraphs: [
          "A home contains many systems that are easy to overlook during everyday routines. A recurring maintenance checklist can help you identify visible wear, leaks, drainage problems and equipment that needs attention.",
          "Adapt the schedule to your property, local weather, equipment manuals and the age of your home."
        ]
      },
      {
        heading: "Before the summer season",
        paragraphs: [
          "Check that air-conditioner filters are maintained according to the manufacturer's instructions and that accessible outdoor units are free of obstructions.",
          "Look for visible electrical damage and make sure fans and other appliances operate normally. Arrange professional inspection for unusual noises, burning smells or recurring electrical faults."
        ]
      },
      {
        heading: "Before and during the monsoon",
        paragraphs: [
          "Inspect accessible drainage points, visible roof areas and window seals for signs of blockage or deterioration. Arrange repairs before heavy rainfall where possible.",
          "Look for damp patches and water entering the property. Do not climb onto wet roofs or work near electrical equipment exposed to water."
        ]
      },
      {
        heading: "During cooler weather",
        paragraphs: [
          "Inspect doors and windows for drafts, clean accessible storage areas and check that ventilation openings are not obstructed.",
          "If your home uses electrical heating equipment, inspect visible cords and plugs and follow the manufacturer's safety instructions."
        ]
      },
      {
        heading: "Monthly indoor checks",
        paragraphs: [
          "Look under sinks, around toilets and near washing-machine connections for leaks. Check visible wall or ceiling marks that could indicate moisture.",
          "Test smoke alarms or other safety devices according to their instructions and replace batteries or equipment as required."
        ]
      },
      {
        heading: "Annual professional checks",
        paragraphs: [
          "Depending on the property, professional maintenance may be appropriate for electrical installations, air conditioning, plumbing and other building systems.",
          "Keep records of service dates, repairs, warranties and recurring problems. These records can help identify patterns and plan future maintenance."
        ]
      },
      {
        heading: "Build a simple maintenance record",
        paragraphs: [
          "Create a list of tasks, the date completed, observations and any follow-up work required. Set reminders for recurring tasks rather than relying entirely on memory.",
          "Prioritise issues involving immediate safety, active water leaks or equipment that has stopped working correctly."
        ]
      }
    ]
  },

  {
    id: 7,
    title: "When Should You Call a Professional Electrician?",
    slug: "when-should-you-call-a-professional-electrician",
    category: "Electrical",
    excerpt:
      "Recognise electrical warning signs and understand which problems require a qualified professional.",
    date: "2026-09-03",
    image:
      "https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "Electrical warning signs should not be ignored",
        paragraphs: [
          "Electrical faults may show up as repeated breaker trips, damaged outlets, unusual heat or unexplained interruptions. These symptoms do not always reveal the underlying cause.",
          "Avoid removing covers or testing live electrical components yourself. A qualified electrician can investigate the installation safely."
        ]
      },
      {
        heading: "Repeated circuit breaker trips",
        paragraphs: [
          "A breaker that repeatedly trips may be responding to an overload or electrical fault. Repeatedly resetting it without investigating the cause can leave a potentially dangerous problem unresolved.",
          "Reduce use of the affected circuit and arrange a professional assessment."
        ]
      },
      {
        heading: "Hot sockets, sparks or burning smells",
        paragraphs: [
          "A hot outlet, visible sparking, smoke or a burning smell can indicate a serious problem. Stop using the affected equipment and keep people away.",
          "If there is smoke, fire or immediate danger, contact emergency services. Do not touch exposed conductors or equipment that may be live."
        ]
      },
      {
        heading: "Damaged wiring or exposed conductors",
        paragraphs: [
          "Frayed insulation, broken switches and exposed wires require appropriate repair. Keep children and pets away from the affected area.",
          "Do not cover exposed conductors with ordinary tape and assume the installation is safe. Have the fault repaired by a qualified professional."
        ]
      },
      {
        heading: "Planning new appliances or renovations",
        paragraphs: [
          "New high-power appliances, additional sockets, renovation work and electrical upgrades may require a review of circuit capacity and protective devices.",
          "Consult an electrician before making changes to fixed wiring, distribution boards or earthing arrangements."
        ]
      },
      {
        heading: "What to tell your electrician",
        paragraphs: [
          "Describe the symptoms, when they started, which rooms or appliances are affected and whether you noticed any unusual smells or sounds. Mention any recent renovations or new equipment.",
          "Ask about the proposed work, safety precautions, expected completion time and applicable charges before authorising the repair."
        ]
      },
      {
        heading: "What you should never attempt",
        paragraphs: [
          "Do not work on live wiring, open a distribution board or bypass protective devices as a DIY solution. Do not replace a breaker with a higher-rated unit to stop nuisance tripping.",
          "Professional assessment is the safer approach when the cause of an electrical problem is uncertain."
        ]
      }
    ]
  },

  {
    id: 8,
    title: "Easy Ways to Keep Your Home Clean Every Day",
    slug: "easy-ways-to-keep-your-home-clean-every-day",
    category: "Cleaning",
    excerpt:
      "Practical daily habits for keeping kitchens, bathrooms, bedrooms and shared spaces more organised.",
    date: "2026-08-30",
    image:
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "Make cleaning easier with small routines",
        paragraphs: [
          "Maintaining a clean home does not always require a long cleaning session. Short, repeatable tasks can help prevent clutter and dirt from building up.",
          "Choose routines that fit your household's schedule rather than trying to clean every room thoroughly every day."
        ]
      },
      {
        heading: "Reset the kitchen after meals",
        paragraphs: [
          "Wash dishes or load the dishwasher, wipe food preparation surfaces and clear spills after cooking. Store food properly and remove waste regularly.",
          "Follow the care instructions for kitchen surfaces and use products suitable for the material."
        ]
      },
      {
        heading: "Keep clutter under control",
        paragraphs: [
          "Return commonly used items to designated places after use. A small basket for items that belong elsewhere can make a quick evening tidy-up easier.",
          "Keep walkways clear and avoid placing heavy objects where they may fall or create a trip hazard."
        ]
      },
      {
        heading: "Use a simple bathroom routine",
        paragraphs: [
          "Wipe water from frequently used surfaces when practical, clean the sink regularly and ensure the room can ventilate adequately.",
          "Address persistent dampness, leaking fixtures or recurring mould rather than relying only on repeated surface cleaning."
        ]
      },
      {
        heading: "Dust and vacuum regularly",
        paragraphs: [
          "Dust accessible surfaces and vacuum floors according to household needs. Homes with pets, heavy foot traffic or people sensitive to dust may need more frequent cleaning.",
          "Use appropriate attachments and follow the vacuum manufacturer's maintenance instructions."
        ]
      },
      {
        heading: "Handle cleaning products safely",
        paragraphs: [
          "Read labels, use products only as directed and keep them away from children and pets. Never mix bleach with ammonia, acids or other cleaners.",
          "Provide ventilation as directed on the product label and use suitable protective equipment when required."
        ]
      },
      {
        heading: "Create a weekly cleaning plan",
        paragraphs: [
          "Assign a few tasks to different days, such as changing bedding, cleaning floors, wiping high-touch surfaces and checking the kitchen and bathroom.",
          "Deep cleaning can then focus on less frequently addressed areas instead of becoming an overwhelming task."
        ]
      }
    ]
  },

  {
    id: 9,
    title: "Things to Check Before Hiring a Home Service Professional",
    slug: "things-to-check-before-hiring-a-home-service-professional",
    category: "Home Improvement",
    excerpt:
      "Use this checklist to compare service providers, understand the work involved and avoid misunderstandings.",
    date: "2026-08-26",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "Understand the problem first",
        paragraphs: [
          "Describe the issue you want resolved, where it occurs and how long it has been happening. Photos can sometimes help explain visible problems, but they do not replace an on-site inspection when one is necessary.",
          "Be clear about whether you need installation, routine maintenance, diagnosis or repair."
        ]
      },
      {
        heading: "1. Check relevant qualifications",
        paragraphs: [
          "Some work, particularly electrical installations and specialised repairs, requires appropriate technical competence and may be subject to local requirements.",
          "Ask about relevant qualifications, experience and authorisations for the specific work being requested."
        ]
      },
      {
        heading: "2. Confirm the scope of work",
        paragraphs: [
          "Ask what the service includes, what is excluded and whether inspection, materials, replacement parts or follow-up visits are included.",
          "Written confirmation can reduce misunderstandings about what will be completed during the appointment."
        ]
      },
      {
        heading: "3. Understand the charges",
        paragraphs: [
          "Before confirming a booking, check the applicable visit charge, labour charge, materials cost and any additional fees. Ask how extra work will be approved.",
          "Do not assume that an advertised starting price covers every possible repair."
        ]
      },
      {
        heading: "4. Ask about timing and availability",
        paragraphs: [
          "Confirm the appointment window, expected duration and how you will be notified if the professional is delayed.",
          "For urgent problems, explain the situation clearly and ask whether the provider can accommodate it."
        ]
      },
      {
        heading: "5. Check reviews and identity information",
        paragraphs: [
          "Look for genuine, relevant customer feedback and check whether the provider explains its complaint-resolution process. Reviews can be useful, but they do not guarantee a particular result.",
          "Confirm the identity of the person arriving and follow sensible home-access precautions."
        ]
      },
      {
        heading: "6. Discuss warranties and follow-up",
        paragraphs: [
          "Ask whether parts or workmanship are covered by a warranty and request the applicable terms in writing. Confirm how to report an issue if the original problem returns.",
          "Keep receipts, booking confirmations and relevant service records."
        ]
      },
      {
        heading: "Booking through a home-services platform",
        paragraphs: [
          "Before booking through a platform, review its booking process, service scope, cancellation rules, payment instructions and customer-support contact details.",
          "Confirm the assigned professional and any appointment changes through the platform's official communication channels."
        ]
      },
      {
        heading: "Final checklist before confirming",
        paragraphs: [
          "Know what work is needed, who will perform it, what it is expected to cost, when the visit will happen and how follow-up concerns will be handled.",
          "For ServoraCare bookings, review the information shown on the service page and confirm the applicable details before submitting your request."
        ]
      }
    ]
  }
];

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function calculateReadTime(post) {
  const text = [
    post.title,
    post.excerpt,
    ...post.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
    ]),
  ].join(" ");

  const words = text.trim().split(/\s+/).length;

  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function ArticleMeta({ post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
      <span className="inline-flex items-center gap-2">
        <CalendarDays size={16} aria-hidden="true" />
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </span>

      <span className="inline-flex items-center gap-2">
        <Clock3 size={16} aria-hidden="true" />
        {calculateReadTime(post)}
      </span>
    </div>
  );
}

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Article Not Found | ServoraCare</title>
        <meta
          name="robots"
          content="noindex, follow"
        />
        <meta
          name="description"
          content="This ServoraCare article could not be found. Browse our home maintenance guides instead."
        />
      </Helmet>

      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
        <div className="max-w-lg text-center">
          <BookOpen
            size={44}
            className="mx-auto text-blue-600"
            aria-hidden="true"
          />

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Article not found
          </h1>

          <p className="mt-3 leading-7 text-gray-600">
            This article may have moved or the link may be incorrect.
            Browse our available home maintenance guides instead.
          </p>

          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back to Blog
          </Link>
        </div>
      </main>
    </>
  );
}

export default function BlogArticle() {
  const { slug } = useParams();

  const post = useMemo(
    () => blogPosts.find((item) => item.slug === slug),
    [slug]
  );

  const relatedPosts = useMemo(() => {
    if (!post) return [];

    const sameCategory = blogPosts.filter(
      (item) => item.id !== post.id && item.category === post.category
    );

    const otherPosts = blogPosts.filter(
      (item) =>
        item.id !== post.id &&
        item.category !== post.category
    );

    return [...sameCategory, ...otherPosts].slice(0, 3);
  }, [post]);

  if (!post) {
    return <NotFound />;
  }

  const articleUrl = `${BLOG_URL}/${post.slug}`;
  const readTime = calculateReadTime(post);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    datePublished: `${post.date}T00:00:00+05:30`,
    dateModified: `${post.date}T00:00:00+05:30`,
    author: {
      "@type": "Organization",
      name: AUTHOR,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "ServoraCare",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    articleSection: post.category,
    inLanguage: "en-IN",
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | ServoraCare Blog</title>

        <meta
          name="description"
          content={post.excerpt}
        />

        <meta
          name="author"
          content={AUTHOR}
        />

        <link
          rel="canonical"
          href={articleUrl}
        />

        <meta
          property="og:title"
          content={`${post.title} | ServoraCare`}
        />

        <meta
          property="og:description"
          content={post.excerpt}
        />

        <meta
          property="og:type"
          content="article"
        />

        <meta
          property="og:url"
          content={articleUrl}
        />

        <meta
          property="og:image"
          content={post.image}
        />

        <meta
          property="og:site_name"
          content="ServoraCare"
        />

        <meta
          property="article:published_time"
          content={`${post.date}T00:00:00+05:30`}
        />

        <meta
          property="article:section"
          content={post.category}
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={post.title}
        />

        <meta
          name="twitter:description"
          content={post.excerpt}
        />

        <meta
          name="twitter:image"
          content={post.image}
        />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-white text-gray-900">
        {/* Article header */}
        <header className="bg-gray-50">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 focus-visible:outline-blue-600"
            >
              <ArrowLeft size={17} aria-hidden="true" />
              Back to Blog
            </Link>

            <div className="mt-8">
              <Link
                to="/blog"
                className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-800"
              >
                {post.category}
              </Link>

              <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
                {post.excerpt}
              </p>

              <div className="mt-6">
                <ArticleMeta post={post} />
              </div>

              <p className="mt-4 text-sm text-gray-500">
                By {AUTHOR}
              </p>
            </div>
          </div>
        </header>

        {/* Featured image */}
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
          <figure className="overflow-hidden rounded-2xl bg-gray-100 sm:rounded-3xl">
            <img
              src={post.image}
              alt={`Illustration for ${post.title}`}
              width="1200"
              height="675"
              fetchPriority="high"
              decoding="async"
              className="max-h-[600px] w-full object-cover"
            />
          </figure>
        </div>

        {/* Article content */}
        <article className="mx-auto max-w-3xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pt-12">
          <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={22}
                className="mt-0.5 shrink-0 text-blue-700"
                aria-hidden="true"
              />

              <p className="text-sm leading-6 text-gray-700">
                This guide provides general home maintenance information.
                The correct solution depends on your property and the
                specific problem. For hazardous electrical faults or
                specialised repairs, seek appropriately qualified help.
              </p>
            </div>
          </div>

          <div className="space-y-10">
            {post.sections.map((section, index) => (
              <section
                key={`${post.slug}-section-${index}`}
                aria-labelledby={`${post.slug}-heading-${index}`}
              >
                <h2
                  id={`${post.slug}-heading-${index}`}
                  className="text-2xl font-bold leading-snug text-gray-900 sm:text-3xl"
                >
                  {section.heading}
                </h2>

                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={`${post.slug}-${index}-${paragraphIndex}`}
                      className="text-base leading-8 text-gray-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Editorial note */}
          <div className="mt-12 border-t border-gray-200 pt-6">
            <p className="text-sm leading-6 text-gray-500">
              <strong>About this guide:</strong> This article is published
              by {AUTHOR}. Review the relevant product instructions and
              professional guidance for your particular situation.
            </p>
          </div>

          {/* Booking CTA */}
          <section className="mt-10 rounded-2xl bg-gray-900 p-7 text-center sm:p-10">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-300">
              ServoraCare · Gwalior
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Looking for home services?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-300">
              Explore available home services and review the booking
              details before choosing the service you need.
            </p>

            <Link
              to="/services"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              Explore services
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </section>
        </article>

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <section
            aria-labelledby="related-heading"
            className="border-t border-gray-100 bg-gray-50"
          >
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <h2
                id="related-heading"
                className="text-2xl font-bold text-gray-900 sm:text-3xl"
              >
                Related articles
              </h2>

              <p className="mt-2 text-gray-600">
                Explore more practical home care guides.
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((related) => (
                  <article
                    key={related.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:shadow-md"
                  >
                    <Link
                      to={`/blog/${related.slug}`}
                      className="block p-5"
                    >
                      <span className="text-xs font-bold uppercase tracking-wide text-blue-700">
                        {related.category}
                      </span>

                      <h3 className="mt-2 text-lg font-bold leading-snug text-gray-900">
                        {related.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        {related.excerpt}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                        Read article
                        <ArrowRight size={15} aria-hidden="true" />
                      </span>
                    </Link>
                  </article>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900"
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  Browse all articles
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
